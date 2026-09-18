"use strict";
(function () {
  const table = document.querySelector("#ordersRows");
  const search = document.querySelector("#orderSearch");
  const filter = document.querySelector("#orderFilter");
  const modal = document.querySelector("#orderModal");
  const orders = SuperColaStore.read("orders");
  const render = () => {
    const query = search.value.trim().toLowerCase();
    const status = filter.value;
    const rows = orders.filter(
      (item) =>
        (!status || item.status === status) &&
        item.customer.toLowerCase().includes(query),
    );
    table.innerHTML = rows.length
      ? rows
          .map(
            (item) =>
              `<tr><td>${item.id}</td><td>${item.customer}</td><td>${SuperColaStore.formatMoney(item.amount)}</td><td>${item.date}</td><td><span class="status ${SuperColaStore.statusClass(item.status)}">${item.status}</span></td></tr>`,
          )
          .join("")
      : `<tr><td colspan="5">سفارشی با این مشخصات پیدا نشد.</td></tr>`;
  };
  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  document
    .querySelector("#newOrderButton")
    .addEventListener("click", () => modal.classList.add("open"));
  document
    .querySelector("#closeOrderModal")
    .addEventListener("click", () => modal.classList.remove("open"));
  document.querySelector("#orderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    orders.unshift({
      id: `#۱۲${(490 + orders.length).toLocaleString("fa-AF")}`,
      customer: data.get("customer"),
      amount: data.get("amount"),
      date: "همین اکنون",
      status: "در حال پردازش",
    });
    SuperColaStore.write("orders", orders);
    event.currentTarget.reset();
    modal.classList.remove("open");
    render();
  });
  render();
})();
