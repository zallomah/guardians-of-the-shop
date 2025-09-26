import { redirect, Form, useLoaderData } from "react-router";

import { getApp } from "~/context/global";
import type { Route } from "./+types/index";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Guardians of the shop" },
    { name: "description", content: "Guardians of the shop" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(getApp().login) };
};

export default function Index() {
  const { showForm } = useLoaderData<typeof loader>();

  return (
    <div>
      <div>
        <h1>A short heading about [your app]</h1>
        <p>A tagline about [your app] that describes your value proposition.</p>
        {showForm && (
          <Form method="post" action="/auth/login">
            <label>
              <span>Shop domain</span>
              <input type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button type="submit">Log in</button>
          </Form>
        )}
        <ul>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li>
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}
