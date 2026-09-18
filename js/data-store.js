"use strict";

const SuperColaStore = (() => {
  const defaults = {
    products: [
      {
        code: "SC-۱۰۲",
        name: "نوشابه کولا خانواده",
        category: "نوشیدنی",
        price: 240000,
        stock: 480,
        minimum: 100,
      },
      {
        code: "SC-۲۱۴",
        name: "نوشابه پرتقالی قوطی",
        category: "نوشیدنی",
        price: 180000,
        stock: 62,
        minimum: 80,
      },
      {
        code: "SC-۰۸۸",
        name: "آب‌معدنی کوچک",
        category: "آب",
        price: 95000,
        stock: 210,
        minimum: 50,
      },
      {
        code: "SC-۱۲۶",
        name: "نوشابه لیمویی خانواده",
        category: "نوشیدنی",
        price: 220000,
        stock: 18,
        minimum: 60,
      },
      {
        code: "SC-۳۱۰",
        name: "هپی مانستر",
        category: "نوشیدنی انرژی‌زا",
        price: 260000,
        stock: 145,
        minimum: 40,
      },
      {
        code: "SC-۳۲۰",
        name: "اکس‌بول",
        category: "نوشیدنی انرژی‌زا",
        price: 240000,
        stock: 120,
        minimum: 35,
      },
      {
        code: "SC-۳۳۰",
        name: "تندر",
        category: "نوشیدنی انرژی‌زا",
        price: 230000,
        stock: 96,
        minimum: 30,
      },
    ],
    customers: [
      {
        name: "فروشگاه زنجیره‌ای افق",
        type: "سازمانی",
        phone: "۰۲۰-۲۱۰۰۱۰۰",
        lastOrder: "امروز",
        status: "فعال",
      },
      {
        name: "سوپرمارکت بهار",
        type: "خرده‌فروشی",
        phone: "۰۷۰-۲۲۵۵۳۱۲۰",
        lastOrder: "دیروز",
        status: "فعال",
      },
      {
        name: "فروشگاه خانواده",
        type: "خرده‌فروشی",
        phone: "۰۷۸-۷۷۶۶۸۸۴۰",
        lastOrder: "۵ روز پیش",
        status: "پیگیری لازم",
      },
    ],
    orders: [
      {
        id: "#۱۲۴۸۹",
        customer: "فروشگاه زنجیره‌ای افق",
        amount: 18450000,
        date: "امروز",
        status: "تحویل شده",
      },
      {
        id: "#۱۲۴۸۸",
        customer: "سوپرمارکت بهار",
        amount: 7820000,
        date: "امروز",
        status: "در حال پردازش",
      },
      {
        id: "#۱۲۴۸۷",
        customer: "فروشگاه خانواده",
        amount: 12200000,
        date: "امروز",
        status: "در انتظار پرداخت",
      },
    ],
  };
  const read = (key) => {
    try {
      const stored = JSON.parse(localStorage.getItem(`super-cola-${key}`));
      if (!stored) return structuredClone(defaults[key]);
      if (key !== "products" || !Array.isArray(stored)) return stored;

      const existingCodes = new Set(stored.map((item) => item.code));
      const missingProducts = defaults.products.filter(
        (product) => !existingCodes.has(product.code),
      );
      if (missingProducts.length) {
        const mergedProducts = [...stored, ...structuredClone(missingProducts)];
        write(key, mergedProducts);
        return mergedProducts;
      }
      return stored;
    } catch (error) {
      return structuredClone(defaults[key]);
    }
  };
  const write = (key, value) =>
    localStorage.setItem(`super-cola-${key}`, JSON.stringify(value));
  const formatMoney = (value) =>
    `${Number(value).toLocaleString("fa-AF")} افغانی`;
  const statusClass = (status) =>
    status.includes("فعال") || status.includes("تحویل")
      ? "green"
      : status.includes("پردازش") ||
          status.includes("پیگیری") ||
          status.includes("اتمام")
        ? "orange"
        : "red";
  return { read, write, formatMoney, statusClass, defaults };
})();
