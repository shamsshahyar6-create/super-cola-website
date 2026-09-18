"use strict";
window.SuperColaStorage = {
  get(key, fallback = null) {
    try {
      return JSON.parse(localStorage.getItem(`super-cola-${key}`)) ?? fallback;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(`super-cola-${key}`, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(`super-cola-${key}`);
  },
};
