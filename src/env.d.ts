/// <reference path="../.astro/types.d.ts" />

/**
 * Cloudflare Turnstile's explicit-rendering API, as used by
 * src/components/ProjectInquiryForm.astro. Only the four methods the form
 * actually calls are declared — this is a vendor global, not a wrapper.
 */
interface TurnstileRenderOptions {
  sitekey: string;
  /** Verified server-side against the same constant in public/_worker.js. */
  action?: string;
  theme?: "auto" | "light" | "dark";
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
}

interface TurnstileApi {
  render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string;
  getResponse: (widgetId?: string) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

interface Window {
  Tawk_API?: {
    maximize?: () => void;
    minimize?: () => void;
    toggle?: () => void;
    onLoad?: () => void;
    [key: string]: unknown;
  };
  Tawk_LoadStart?: Date;
  __tawkLoaded?: boolean;
  turnstile?: TurnstileApi;
  /** Shared one-shot loader promise for the Turnstile script. */
  __cfTurnstileLoader?: Promise<void>;
  /** GA4, injected inline in BaseLayout.astro. */
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
