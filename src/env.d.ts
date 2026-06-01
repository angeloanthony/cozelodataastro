/// <reference path="../.astro/types.d.ts" />

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
}
