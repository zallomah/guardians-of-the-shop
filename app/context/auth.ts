import { AsyncLocalStorage } from "async_hooks";
import type { MiddlewareFunction } from "react-router";
import type {
  AdminApiContext,
  Session,
} from "@shopify/shopify-app-react-router/server";

import { getApp } from "./global";

interface ShopifyContext {
  admin: AdminApiContext;
  session: Session;
}

const authContext = new AsyncLocalStorage<ShopifyContext>();

function getAuthStore() {
  const store = authContext.getStore();
  if (!store) {
    throw new Error("No auth store available");
  }
  return store;
}

export function getShopifyAdmin() {
  const store = getAuthStore();
  return store.admin;
}

export function getShopifySession() {
  const store = getAuthStore();
  return store.session;
}

export const authMiddleware: MiddlewareFunction<Response> = async (
  { request },
  next
) => {
  const { admin, session } = await getApp().authenticate.admin(request);

  return new Promise((resolve) =>
    authContext.run({ admin, session }, () => resolve(next()))
  );
};
