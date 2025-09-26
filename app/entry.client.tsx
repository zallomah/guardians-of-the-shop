import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { I18nextProvider } from "react-i18next";

import { initializeI18n } from "~/i18n/client";

async function main() {
  const instance = await initializeI18n();

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={instance}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>
    );
  });
}

main().catch((error) => console.error(error));
