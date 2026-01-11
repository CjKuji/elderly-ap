import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// App-wide configuration: sets up global providers for the app.
// - provideBrowserGlobalErrorListeners: captures unhandled errors globally.
// - provideZoneChangeDetection: optimizes change detection by coalescing events.
// - provideRouter(routes): registers the router with defined routes.
export const appConfig: ApplicationConfig = {
  providers: [
    // capture and report uncaught errors (useful during debugging)
    provideBrowserGlobalErrorListeners(),
    // improve performance by coalescing rapid DOM events
    provideZoneChangeDetection({ eventCoalescing: true }),
    // register app routes
    provideRouter(routes)
  ]
};
