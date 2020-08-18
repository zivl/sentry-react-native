import { startTransaction } from "@sentry/core";
import { Hub } from "@sentry/hub";
import { BrowserTracing } from "@sentry/tracing/dist/browser";
import { BrowserTracingOptions } from "@sentry/tracing/dist/browser/browsertracing";
import {
  EventProcessor,
  Integration,
  Transaction,
  TransactionContext,
} from "@sentry/types";

type NavigationEvent = {
  target: string | undefined;
};

type NavigationProp = {
  addListener: (type: string, callback: (e: NavigationEvent) => void) => void;
};

/**
 *
 */
function createInstrumentation(): { onStateChange: () => void } {
  return (
    startTransaction,
    startTransactionOnPageLoad,
    startTransactionOnLocationChange
  ) => {
    return reactNativeRoutingInstrumentation();
  };
}

/**
 *
 */
function reactNativeRoutingInstrumentation<T extends Transaction>(
  startTransaction: (context: TransactionContext) => T | undefined,
  startTransactionOnPageLoad: boolean = true,
  startTransactionOnLocationChange: boolean = true,
  onStateChange: () => void
): void {
  let activeTransaction: T | undefined;

  if (startTransactionOnLocationChange) {
    onStateChange(() => {
      console.log("boo");
    });
  }
}

interface ReactNativeTracingOptions extends BrowserTracingOptions {
  navigation: NavigationProp;
}

/**
 *
 */
export class ReactNativeTracing extends BrowserTracing implements Integration {
  public constructor(_options?: Partial<ReactNativeTracingOptions>) {
    const options = {
      ...(_options ?? {}),
      routingInstrumentation: (...args) =>
        reactNativeRoutingInstrumentation(...args, _options.navigation),
    };

    super(options);
  }
}
