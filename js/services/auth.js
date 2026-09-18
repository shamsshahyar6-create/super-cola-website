"use strict";
window.SuperColaAuthService = {
  session() {
    return window.SuperColaAuth?.current() || null;
  },
};
