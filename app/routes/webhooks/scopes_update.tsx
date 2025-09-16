import { getApp } from "~/context/global";
import type { Route } from "./+types/scopes_update";

export const action = async ({ request }: Route.ActionArgs) => {
  const { topic, shop } = await getApp().authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);

  return new Response();
};
