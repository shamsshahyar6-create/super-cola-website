"use strict";
(function () {
  const products = SuperColaStore.read("products");
  const modal = document.querySelector("#stockModal");
  document
    .querySelector("#newStockButton")
    ?.addEventListener("click", () => modal.classList.add("open"));
  document
    .querySelector("#closeStockModal")
    ?.addEventListener("click", () => modal.classList.remove("open"));
  document.querySelector("#stockForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const product = products.find((item) => item.code === data.product);
    if (!product) {
      SuperColaUI.toast("محصول انتخاب‌شده پیدا نشد.", "error");
      return;
    }
    product.stock += Number(data.quantity);
    SuperColaStore.write("products", products);
    event.currentTarget.reset();
    modal.classList.remove("open");
    document
      .querySelector("#warehouseSearch")
      .dispatchEvent(new Event("input"));
    SuperColaUI.toast("ورود کالا ثبت شد.");
  });
})();
