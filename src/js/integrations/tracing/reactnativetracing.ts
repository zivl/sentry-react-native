import {
  defaultRequestInstrumentionOptions,
  registerRequestInstrumentation,
  RequestInstrumentationOptions,
} from "@sentry/tracing";
import { EventProcessor, Hub, Integration } from "@sentry/types";

// type NavigationEvent = {
//   target: string | undefined;
// };

// type NavigationProp = {
//   addListener: (type: string, callback: (e: NavigationEvent) => void) => void;
// };

interface ReactNativeTracingOptions extends RequestInstrumentationOptions {
  a: 0;
}

/**
 *
 */
export class ReactNativeTracing implements Integration {
  public name: string;
  public options: ReactNativeTracingOptions;

  // @ts-ignore
  private _getCurrentHub?: () => Hub;

  public constructor(_options: Partial<ReactNativeTracingOptions>) {
    this.name = "ReactNativeTracing";
    this.options = {
      ..._options,
      ...defaultRequestInstrumentionOptions,
      a: 0,
    };
  }

  /**
   *
   */
  setupOnce(
    _: (callback: EventProcessor) => void,
    getCurrentHub: () => Hub
  ): void {
    this._getCurrentHub = getCurrentHub;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const {
      traceFetch,
      traceXHR,
      tracingOrigins,
      shouldCreateSpanForRequest,
    } = this.options;

    registerRequestInstrumentation({
      traceFetch,
      traceXHR,
      tracingOrigins,
      shouldCreateSpanForRequest,
    });
  }
}
