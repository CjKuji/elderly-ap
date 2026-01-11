import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * Small wrapper around Supabase client to centralize auth and RPC calls.
 * - Uses `localStorage` for auth persistence for compatibility.
 * - Exposes minimal helper methods used by the UI.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Configure Supabase client. We prefer localStorage here to avoid
    // IndexedDB-based issues on some platforms.
   this.supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseKey,
  {
    auth: {
      storage: localStorage,
      autoRefreshToken: false, // disables auto-refresh lock behavior
      persistSession: true
    }
  }
);
  }

  // Register a new user
  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  // Log in existing user with email/password
  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // Sign out currently authenticated user
  async signOut() {
    return this.supabase.auth.signOut();
  }

  // Returns the current user object or null
  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  // Create a post via a Postgres RPC (`create_post`)
  createPost(content: string) {
    return this.supabase.rpc('create_post', { p_content: content });
  }

  // Create a reply tied to a post via RPC (`create_reply`)
  createReply(postId: string, content: string) {
    return this.supabase.rpc('create_reply', {
      p_post_id: postId,
      p_content: content
    });
  }

  // Fetch posts joined with replies via RPC
  getFeed() {
    return this.supabase.rpc('get_posts_with_replies');
  }
}