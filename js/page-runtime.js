"use strict";
(function () {
  const back = document.querySelector("[data-action='back']");
  back?.addEventListener("click", () => history.back());
  document.querySelectorAll("button").forEach((button) => {
    if (button.dataset.action === "back") return;
    if (
      /ذخیره|ثبت|افزودن|مشاهده/.test(button.textContent) &&
      window.SuperColaUI
    ) {
      button.addEventListener("click", () =>
        SuperColaUI.toast("عملیات با موفقیت ثبت شد."),
      );
    }
  });
})();
