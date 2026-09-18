"use strict";
(function () {
  const rows = document.querySelector("#warehouseRows");
  const search = document.querySelector("#warehouseSearch");
  const products = SuperColaStore.read("products");
  const render = () => {
    const query = search.value.trim().toLowerCase();
    const list = products.filter(
      (item) =>
        item.name.toLowerCase().includes(query) || item.code.includes(query),
    );
    rows.innerHTML = list
      .map((item) => {
        const status =
          item.stock <= item.minimum / 2
            ? "نیازمند تأمین"
            : item.stock <= item.minimum
              ? "رو به اتمام"
              : "موجود";
        return `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.category}</td><td>${item.stock} کارتن</td><td>${item.minimum}</td><td><span class="status ${SuperColaStore.statusClass(status)}">${status}</span></td></tr>`;
      })
      .join("");
  };
  search.addEventListener("input", render);
  render();
})();
