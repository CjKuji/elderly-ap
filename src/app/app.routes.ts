import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth';
import { FeedComponent } from './pages/feed/feed';
import { AuthGuard } from './guard/auth.guard';

// Application routes:
// - '/auth' shows the authentication page
// - '' (root) shows the feed and is protected by `AuthGuard`
export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: '', component: FeedComponent, canActivate: [AuthGuard] }
];
