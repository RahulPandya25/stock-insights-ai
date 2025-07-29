export const LOAD_STATUS = {
  NEVER: "NEVER",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
};

export const ALERT_TYPE = {
  INFO: "INFO",
  SUCCESS: "SUCCESS",
  WARNING: "WARNING",
  ERROR: "ERROR",
};

export const ROUTES = {
  LOGIN_REGISTER: "/login-register", // TODO: split this route
  CREATE_SCHEMA: "/create-schema",
  DASHBOARD: "/dashboard",
  SCHEMA: "/dashboard/schema/:schemaId",
  TABLE: "/dashboard/schema/:schemaId/table/:tableName",
  CONTACT: "/contact",
};
