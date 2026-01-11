import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';

/**
 * AuthComponent handles user authentication: login and registration flows.
 * - Uses `SupabaseService` to interact with Supabase Auth.
 * - Uses `Router` to navigate after successful login.
 */
@Component({
  standalone: true,
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent {
  // Form model
  email = '';
  password = '';
  isRegisterMode = false; // toggle between register/login
  loading = false; // prevents multiple simultaneous requests

  constructor(private supabase: SupabaseService, private router: Router) {}

  // Toggle between register and login modes and reset fields
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.email = '';
    this.password = '';
  }

  // Submit handler for both register and login
  async submit() {
    if (this.loading) return;
    this.loading = true;

    try {
      if (this.isRegisterMode) {
        // REGISTER FLOW: call service, then switch to login
        const { error } = await this.supabase.signUp(this.email, this.password);
        if (error) throw error;

        alert('Registered successfully! Please log in.');
        this.isRegisterMode = false; // switch to login mode
        this.email = '';
        this.password = '';
      } else {
        // LOGIN FLOW: attempt sign-in and navigate to feed on success
        const { error } = await this.supabase.signIn(this.email, this.password);
        if (error) throw error;

        alert('Login successful!');
        this.router.navigate(['/']); // redirect to feed/home page
      }
    } catch (err: any) {
      // surface error messages to the user
      alert(err.message);
    } finally {
      this.loading = false;
    }
  }

  // On init: optionally fetch user info (no redirect here)
  async ngOnInit() {
    const user = await this.supabase.getUser();
    // Optional: show user info on auth page, but do NOT redirect automatically
  }
}
