"use strict";
window.formatAfghanDate = (value = new Date()) =>
  new Intl.DateTimeFormat("fa-AF", { dateStyle: "medium" }).format(
    new Date(value),
  );
