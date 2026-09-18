"use strict";
window.SuperColaPageCustomers = {
  init() {
    document
      .querySelector("#customerSearch")
      ?.dispatchEvent(new Event("input"));
  },
};
