import { getEnv } from "~/context/global";

export async function localFetch(input: string) {
  return fetch(`http://localhost:${__SERVER_PORT__}/${input}`);
}

export function remoteFetch(input: string) {
  return getEnv().ASSETS.fetch(`https://assets.local/${input}`);
}
