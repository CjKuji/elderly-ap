/**
 * Entry point of the application.
 * Bootstraps the Angular application with the standalone `RootComponent`.
 * `appConfig` supplies global providers such as the router and error listeners.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { RootComponent } from './app/root/root';
import { appConfig } from './app/app.config';

bootstrapApplication(RootComponent, appConfig)
  .catch(err => console.error(err));
