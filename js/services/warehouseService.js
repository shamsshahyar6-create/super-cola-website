"use strict";
window.SuperColaWarehouseService = {
  products() {
    return window.SuperColaStore?.read("products") || [];
  },
};
