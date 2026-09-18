"use strict";
(function () {
  const rows = document.querySelector("#productsRows");
  const search = document.querySelector("#productSearch");
  const products = SuperColaStore.read("products");
  const render = () => {
    const q = search.value.trim().toLowerCase();
    rows.innerHTML =
      products
        .filter((p) =>
          `${p.name} ${p.code} ${p.category}`.toLowerCase().includes(q),
        )
        .map(
          (p) =>
            `<tr><td>${p.code}</td><td>${p.name}</td><td>${p.category}</td><td>${SuperColaStore.formatMoney(p.price)}</td><td><span class="status ${p.stock ? "green" : "red"}">${p.stock ? "فعال" : "غیرفعال"}</span></td></tr>`,
        )
        .join("") || `<tr><td colspan="5">محصولی پیدا نشد.</td></tr>`;
  };
  search.addEventListener("input", render);
  render();
  document
    .querySelector("#newProductButton")
    ?.addEventListener("click", () =>
      document.querySelector("#productModal").classList.add("open"),
    );
  document
    .querySelector("#closeProductModal")
    ?.addEventListener("click", () =>
      document.querySelector("#productModal").classList.remove("open"),
    );
  document
    .querySelector("#productForm")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget));
      if (products.some((product) => product.code === data.code.trim())) {
        SuperColaUI.toast("کد محصول تکراری است.", "error");
        return;
      }
      products.push({
        code: data.code.trim(),
        name: data.name.trim(),
        category: data.category,
        price: Number(data.price),
        stock: Number(data.stock),
        minimum: Number(data.minimum),
      });
      SuperColaStore.write("products", products);
      event.currentTarget.reset();
      document.querySelector("#productModal").classList.remove("open");
      render();
      SuperColaUI.toast("محصول جدید با موفقیت ثبت شد.");
    });
})();
