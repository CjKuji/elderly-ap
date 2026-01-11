import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase';

/**
 * AuthGuard prevents access to protected routes when the user is not authenticated.
 * It relies on `SupabaseService.getUser()` which checks the current session.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    // Check for a current user; redirect to /auth if not authenticated
    const user = await this.supabase.getUser();
    if (user) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
