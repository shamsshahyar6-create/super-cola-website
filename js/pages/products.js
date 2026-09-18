"use strict";
window.SuperColaPageProducts = {
  init() {
    document.querySelector("#productSearch")?.dispatchEvent(new Event("input"));
  },
};
