import debug from "debug";

interface DebugLogger {
  (namespace: string, formatter: any, ...args: any[]): void;
}

export let debugLog: DebugLogger = () => {};

if (import.meta.env.DEV) {
  debugLog = (namespace, formatter, ...args) => {
    const log = debug(`app:${namespace}`);
    log(formatter, ...args);
  };
}
