export function cfLog(message: string, obj: Record<string, unknown> = {}) {
  const { error, ...rest } = obj;
  delete rest["message"];

  let parsed: Record<string, unknown> = error ? { error } : {};

  if (error instanceof Error) {
    parsed = {
      error: error.message,
    };
  }

  console.log({ message, ...parsed, ...rest });
}
