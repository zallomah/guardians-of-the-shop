import { useState } from "react";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { Form, useActionData, useLoaderData } from "react-router";

import { getApp } from "~/context/global";
import type { Route } from "./+types/login";
import { parseLoginError } from "./error.server";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const errors = parseLoginError(await getApp().login(request));

  return { errors };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const errors = parseLoginError(await getApp().login(request));

  return {
    errors,
  };
};

export default function Login() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <AppProvider embedded={false}>
      <s-page>
        <Form method="post">
          <s-section heading="Log in">
            <s-text-field
              name="shop"
              label="Shop domain"
              details="example.myshopify.com"
              value={shop}
              onChange={(e) => setShop(e.currentTarget.value)}
              autocomplete="on"
              error={errors.shop}
            ></s-text-field>
            <s-button type="submit">Log in</s-button>
          </s-section>
        </Form>
      </s-page>
    </AppProvider>
  );
}
