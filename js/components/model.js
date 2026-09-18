"use strict";
window.SuperColaModel = {
  create(data) {
    return { ...data, createdAt: new Date().toISOString() };
  },
};
