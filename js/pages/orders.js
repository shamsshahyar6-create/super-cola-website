"use strict";
window.SuperColaPageOrders = {
  init() {
    document.querySelector("#orderSearch")?.dispatchEvent(new Event("input"));
  },
};
