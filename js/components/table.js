"use strict";
window.SuperColaTable = {
  rows(table) {
    return [...(table?.querySelectorAll("tbody tr") || [])];
  },
};
