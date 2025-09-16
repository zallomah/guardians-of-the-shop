import { boundary } from "@shopify/shopify-app-react-router/server";

import { getApp } from "~/context/global";
import type { Route } from "./+types/catchall";

export const loader = async ({ request }: Route.LoaderArgs) => {
  await getApp().authenticate.admin(request);

  return null;
};

export const headers: Route.HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
