import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * RootComponent is the application's shell. It hosts the router outlet
 * where routed pages (Auth, Feed, etc.) will render.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class RootComponent {}
