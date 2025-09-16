import { createRequestHandler, RouterContextProvider } from "react-router";

import i18n from "~/i18n/common";
import { withGlobalContext } from "~/context/global";

declare module "react-router" {
  export interface RouterContextProvider {
    lng: string;
    env: Env;
    ctx: ExecutionContext;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    return withGlobalContext(env, () => {
      const url = new URL(request.url);
      const locale = new URLSearchParams(url.search).get("locale");
      const lng = locale || i18n.fallbackLng;

      const context = new RouterContextProvider();
      Object.assign(context, { env, ctx, lng });
      return requestHandler(request, context);
    });
  },
} satisfies ExportedHandler<Env>;
