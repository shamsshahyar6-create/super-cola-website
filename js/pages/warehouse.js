"use strict";
window.SuperColaPageWarehouse = {
  init() {
    document
      .querySelector("#warehouseSearch")
      ?.dispatchEvent(new Event("input"));
  },
};
