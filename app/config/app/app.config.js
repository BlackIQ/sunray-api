import env from "$app/env/index.js";

export default {
  environment: env.APP_ENVIRONMENT,
  port: env.APP_PORT,
  secret: env.APP_SECRET,
  production: env.APP_ENVIRONMENT === "production" ? true : false,
  version: "1.0.0",
};
