"use strict";
(function () {
  const rows = document.querySelector("#customersRows");
  const search = document.querySelector("#customerSearch");
  const customers = SuperColaStore.read("customers");
  const render = () => {
    const q = search.value.trim().toLowerCase();
    rows.innerHTML =
      customers
        .filter((c) => `${c.name} ${c.phone}`.toLowerCase().includes(q))
        .map(
          (c) =>
            `<tr><td>${c.name}</td><td>${c.type}</td><td>${c.phone}</td><td>${c.lastOrder}</td><td><span class="status ${SuperColaStore.statusClass(c.status)}">${c.status}</span></td></tr>`,
        )
        .join("") || `<tr><td colspan="5">مشتری پیدا نشد.</td></tr>`;
  };
  search.addEventListener("input", render);
  render();
  document
    .querySelector("#newCustomerButton")
    ?.addEventListener("click", () =>
      document.querySelector("#customerModal").classList.add("open"),
    );
  document
    .querySelector("#closeCustomerModal")
    ?.addEventListener("click", () =>
      document.querySelector("#customerModal").classList.remove("open"),
    );
  document
    .querySelector("#customerForm")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      if (customers.some((customer) => customer.phone === data.phone.trim())) {
        SuperColaUI.toast("این شماره تماس قبلاً ثبت شده است.", "error");
        return;
      }
      customers.push({
        name: data.name.trim(),
        type: data.type,
        phone: data.phone.trim(),
        lastOrder: "بدون سفارش",
        status: "فعال",
      });
      SuperColaStore.write("customers", customers);
      event.currentTarget.reset();
      document.querySelector("#customerModal").classList.remove("open");
      render();
      SuperColaUI.toast("مشتری جدید با موفقیت ثبت شد.");
    });
})();
