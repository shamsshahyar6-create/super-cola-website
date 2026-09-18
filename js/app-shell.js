"use strict";
(function () {
  const session = SuperColaAuth.requirePage();
  if (!session) return;
  const root = SuperColaAuth.getRootPath();
  const userName = document.querySelector("#userName");
  const userRole = document.querySelector("#userRole");
  if (userName) userName.textContent = session.name;
  if (userRole) userRole.textContent = session.role;
  document
    .querySelector("#logoutButton")
    ?.addEventListener("click", SuperColaAuth.logout);
  document
    .querySelector("#menuButton")
    ?.addEventListener("click", () =>
      document.querySelector("#sidebar")?.classList.toggle("open"),
    );
  document.querySelectorAll("[data-page]").forEach((item) => {
    if (item.dataset.page === location.pathname.split("/").pop())
      item.classList.add("active");
    item.href = root + "pages/" + item.dataset.page;
  });
  if (session.allowed[0] === "*") {
    const nav = document.querySelector(".nav-list");
    const extras = [
      ["production.html", "⚙ تولید"],
      ["branches.html", "⌂ نمایندگی‌ها"],
      ["attendance.html", "✓ حاضری"],
      ["payroll.html", "₋ معاشات"],
      ["vehicles.html", "▣ موترها"],
      ["users.html", "♙ کاربران"],
      ["audit.html", "≡ لاگ رویدادها"],
    ];
    if (nav)
      extras.forEach(([page, title]) => {
        if (nav.querySelector(`[data-page="${page}"]`)) return;
        const link = document.createElement("a");
        link.className = "nav-item";
        link.dataset.page = page;
        link.href = `${root}pages/${page}`;
        link.textContent = title;
        nav.appendChild(link);
      });
  }

  const toast = (message, type = "success") => {
    let element = document.querySelector("#appToast");
    if (!element) {
      element = document.createElement("div");
      element.id = "appToast";
      element.className = "toast";
      document.body.appendChild(element);
    }
    element.textContent = message;
    element.dataset.type = type;
    element.classList.add("show");
    clearTimeout(element.timer);
    element.timer = setTimeout(() => element.classList.remove("show"), 3000);
  };

  const downloadTable = (table) => {
    const lines = [...table.querySelectorAll("tr")].map((row) =>
      [...row.children]
        .map((cell) => `"${cell.textContent.trim().replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob(["\ufeff" + lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${document.title.split("|")[0].trim() || "گزارش"}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast("فایل گزارش آماده دانلود شد.");
  };

  document.querySelectorAll("button").forEach((button) => {
    const label = button.textContent.trim();
    if (/دانلود|خروجی/.test(label))
      button.addEventListener("click", () => {
        const table =
          button.closest(".panel")?.querySelector("table") ||
          document.querySelector("table");
        if (table) downloadTable(table);
        else toast("جدول قابل خروجی‌گیری پیدا نشد.", "error");
      });
    if (/ذخیره/.test(label) && !button.closest("#orderForm"))
      button.addEventListener("click", () => {
        const form = button.closest("form");
        if (form)
          localStorage.setItem(
            `super-cola-settings-${location.pathname}`,
            JSON.stringify(Object.fromEntries(new FormData(form))),
          );
        toast("تغییرات با موفقیت ذخیره شد.");
      });
    if (/مشاهده/.test(label))
      button.addEventListener("click", () =>
        toast("جزئیات گزارش در حال آماده‌سازی است."),
      );
    if (
      /جدید|ثبت ورود|کارمند جدید/.test(label) &&
      !button.id &&
      !button.getAttribute("onclick")
    )
      button.addEventListener("click", () =>
        toast("فرم این بخش در حال آماده‌سازی است."),
      );
  });
  window.SuperColaUI = { toast, downloadTable };
})();
