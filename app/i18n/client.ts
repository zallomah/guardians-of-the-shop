import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import i18n from "./common";

export async function initializeI18n() {
  const instance = createInstance();

  await instance
    .use(HttpBackend)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ...i18n,
      detection: { order: ["htmlTag"], caches: [] },
      backend: {
        loadPath: "/locales/{{lng}}.json",
      },
    });

  return instance;
}
