"use strict";

const SuperColaAuth = (() => {
  const sessionKey = "super-cola-session";
  const defaultEmployees = [
    {
      id: "admin",
      password: "1234",
      name: "علی رضایی",
      role: "مدیر کل",
      page: "index.html",
      allowed: ["*"],
    },
    {
      id: "warehouse",
      password: "1234",
      name: "مریم احمدی",
      role: "مسؤول انبار",
      page: "pages/warehouse.html",
      allowed: ["warehouse.html"],
    },
    {
      id: "sales",
      password: "1234",
      name: "رضا کریمی",
      role: "کارشناس فروش",
      page: "pages/orders.html",
      allowed: ["orders.html"],
    },
    {
      id: "finance",
      password: "1234",
      name: "سارا محمدی",
      role: "مسؤول مالی",
      page: "pages/reports.html",
      allowed: ["reports.html"],
    },
    {
      id: "support",
      password: "1234",
      name: "نگار حسینی",
      role: "پشتیبانی مشتریان",
      page: "pages/customers.html",
      allowed: ["customers.html"],
    },
  ];
  const getEmployees = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("super-cola-employees")) ||
        defaultEmployees
      );
    } catch (error) {
      return defaultEmployees;
    }
  };
  const saveEmployees = (items) =>
    localStorage.setItem("super-cola-employees", JSON.stringify(items));

  function login(id, password) {
    const employee = getEmployees().find(
      (item) =>
        item.id === id && item.password === password && item.active !== false,
    );
    if (!employee) return null;
    const session = {
      id: employee.id,
      name: employee.name,
      role: employee.role,
      page: employee.page,
      allowed: employee.allowed,
    };
    localStorage.setItem(sessionKey, JSON.stringify(session));
    return session;
  }

  function current() {
    try {
      const session = JSON.parse(localStorage.getItem(sessionKey) || "null");
      const employee = getEmployees().find((item) => item.id === session?.id);
      if (session && employee && !session.allowed)
        session.allowed = employee.allowed;
      return session;
    } catch (error) {
      localStorage.removeItem(sessionKey);
      return null;
    }
  }

  function logout() {
    localStorage.removeItem(sessionKey);
    window.location.href = getRootPath() + "login.html";
  }

  function getRootPath() {
    return window.location.pathname.includes("/pages/") ? "../" : "";
  }

  function requireAuth() {
    const session = current();
    if (!session) window.location.href = getRootPath() + "login.html";
    return session;
  }

  function requirePage() {
    const session = requireAuth();
    if (!session) return null;
    const page = window.location.pathname.split("/").pop();
    if (session.allowed[0] !== "*" && !session.allowed.includes(page))
      window.location.href = getRootPath() + session.page;
    return session;
  }

  return {
    employees: defaultEmployees,
    getEmployees,
    saveEmployees,
    login,
    current,
    logout,
    requireAuth,
    requirePage,
    getRootPath,
  };
})();
