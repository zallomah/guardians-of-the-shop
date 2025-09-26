import { AsyncLocalStorage } from "async_hooks";

import loadBackend from "~/backend.server";

interface GlobalStore extends ReturnType<typeof loadBackend> {
  env: Env;
}

const globalContext = new AsyncLocalStorage<GlobalStore>();

function getGlobalStore() {
  const store = globalContext.getStore();
  if (!store) {
    throw new Error("No global store available");
  }
  return store;
}

export function getEnv() {
  const store = getGlobalStore();
  return store.env;
}

export function getApp() {
  const store = getGlobalStore();
  return store.app;
}

export function getDb() {
  const store = getGlobalStore();
  return store.db;
}

export function withGlobalContext<T>(env: Env, fn: () => T): T {
  return globalContext.run(
    {
      env,
      ...loadBackend(env),
    },
    fn
  );
}
