"use strict";
window.SuperColaApi = {
  async get(resource) {
    return window.SuperColaStorage ? SuperColaStorage.get(resource, []) : [];
  },
  async save(resource, data) {
    if (window.SuperColaStorage) SuperColaStorage.set(resource, data);
    return data;
  },
};
