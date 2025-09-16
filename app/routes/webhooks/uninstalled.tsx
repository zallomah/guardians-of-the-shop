import { getApp } from "~/context/global";
import type { Route } from "./+types/uninstalled";

export const action = async ({ request }: Route.ActionArgs) => {
  const { shop, topic } = await getApp().authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);

  return new Response();
};
