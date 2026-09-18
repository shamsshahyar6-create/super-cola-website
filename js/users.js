"use strict";
(function () {
  const rows = document.querySelector("#usersRows");
  const modal = document.querySelector("#userModal");
  const form = document.querySelector("#userForm");
  const employees = SuperColaAuth.getEmployees();
  const pageByRole = {
    "مسؤول انبار": "warehouse.html",
    "کارشناس فروش": "orders.html",
    "مسؤول مالی": "reports.html",
    "پشتیبانی مشتریان": "customers.html",
    "مدیر کل": "index.html",
  };
  const render = () => {
    rows.innerHTML = employees
      .map(
        (user, index) =>
          `<tr><td>${user.name}</td><td>${user.id}</td><td>${user.role}</td><td>${user.role === "مدیر کل" ? "همه بخش‌ها" : user.page.replace(".html", "")}</td><td>${user.active === false ? '<span class="status red">غیرفعال</span>' : '<span class="status green">فعال</span>'}</td><td><button class="button secondary" data-toggle="${index}">${user.active === false ? "فعال‌سازی" : "غیرفعال‌سازی"}</button></td></tr>`,
      )
      .join("");
    rows.querySelectorAll("[data-toggle]").forEach((button) =>
      button.addEventListener("click", () => {
        const user = employees[Number(button.dataset.toggle)];
        if (user.id === "admin") return;
        user.active = user.active === false;
        SuperColaAuth.saveEmployees(employees);
        render();
        SuperColaUI.toast(user.active ? "کاربر فعال شد." : "کاربر غیرفعال شد.");
      }),
    );
  };
  document
    .querySelector("#newUserButton")
    .addEventListener("click", () => modal.classList.add("open"));
  document
    .querySelector("#closeUserModal")
    .addEventListener("click", () => modal.classList.remove("open"));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (employees.some((item) => item.id === data.id.trim())) {
      SuperColaUI.toast("این شناسه قبلاً استفاده شده است.", "error");
      return;
    }
    const page = pageByRole[data.role] || "customers.html";
    employees.push({
      id: data.id.trim(),
      password: data.password,
      name: data.name.trim(),
      role: data.role,
      page: `pages/${page}`,
      allowed: [page],
      active: true,
    });
    SuperColaAuth.saveEmployees(employees);
    form.reset();
    modal.classList.remove("open");
    render();
    SuperColaUI.toast("کارمند جدید با موفقیت اضافه شد.");
  });
  render();
})();
