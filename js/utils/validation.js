"use strict";
window.SuperColaValidation = {
  required(value) {
    return String(value ?? "").trim().length > 0;
  },
  positiveNumber(value) {
    return Number.isFinite(Number(value)) && Number(value) >= 0;
  },
  phone(value) {
    return /^[+0-9۰-۹ ()-]{7,20}$/.test(String(value ?? "").trim());
  },
};
