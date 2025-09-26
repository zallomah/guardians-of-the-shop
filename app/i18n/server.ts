import type { HttpBackendOptions } from "i18next-http-backend";
import { createInstance } from "i18next";
import HTTPBackend from "i18next-http-backend";

import i18n from "./common";
import { localFetch, remoteFetch } from "./helpers";

export function initializeI18n(lng: string) {
  const instance = createInstance();

  const alternateFetch = import.meta.env.DEV ? localFetch : remoteFetch;

  instance.use(HTTPBackend).init<HttpBackendOptions>({
    ...i18n,
    lng,
    backend: {
      alternateFetch,
      loadPath: "locales/{{lng}}.json",
    },
  });

  return instance;
}
