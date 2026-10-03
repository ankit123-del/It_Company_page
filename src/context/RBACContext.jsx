import React, { createContext, useContext } from "react";

const RBACContext = createContext();

export const permissions = {
  admin: [
    "users.view",
    "users.create",
    "users.edit",
    "users.delete",
    "projects.view",
    "projects.create",
    "projects.edit",
    "projects.delete",
    "invoices.view",
    "invoices.create",
    "invoices.edit",
    "invoices.delete",
    "tickets.view",
    "tickets.resolve",
    "tickets.delete",
    "leads.view",
    "leads.create",
    "leads.edit",
    "leads.delete",
    "analytics.view",
    "settings.manage",
    "logs.view",
  ],
  manager: [
    "users.view",
    "users.create",
    "users.edit",
    "projects.view",
    "projects.create",
    "projects.edit",
    "invoices.view",
    "invoices.create",
    "tickets.view",
    "tickets.resolve",
    "leads.view",
    "leads.create",
    "leads.edit",
    "analytics.view",
  ],
  user: ["projects.view", "invoices.view", "tickets.view", "tickets.create"],
  client: ["projects.view", "invoices.view", "tickets.view", "tickets.create"],
};

export const RBACProvider = ({ children, role = "user" }) => {
  const hasPermission = (permission) => {
    return permissions[role]?.includes(permission) || false;
  };

  const hasAnyPermission = (permissionList) => {
    return permissionList.some((p) => hasPermission(p));
  };

  return (
    <RBACContext.Provider value={{ role, hasPermission, hasAnyPermission }}>
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const ctx = useContext(RBACContext);
  if (!ctx) throw new Error("useRBAC must be used within RBACProvider");
  return ctx;
};

export const Can = ({ perform, children, fallback = null }) => {
  const { hasPermission } = useRBAC();
  return hasPermission(perform) ? children : fallback;
};
