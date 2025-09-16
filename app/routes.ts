import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  route("app", "routes/app/layout.tsx", [index("routes/app/index.tsx")]),

  ...prefix("auth", [
    route("login", "routes/auth/login.tsx"),
    route("*", "routes/auth/catchall.tsx"),
  ]),

  ...prefix("webhooks/app", [
    route("scopes_update", "routes/webhooks/scopes_update.tsx"),
    route("uninstalled", "routes/webhooks/uninstalled.tsx"),
  ]),
] satisfies RouteConfig;
