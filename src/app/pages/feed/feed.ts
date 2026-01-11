import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase';

/**
 * Reply and Post shape returned from Supabase RPCs.
 * Keep these minimal—only the fields the UI expects.
 */
interface Reply {
  id: string;
  content: string;
  created_at: string;
  user_email: string;
}

interface Post {
  id: string;
  content: string;
  created_at: string;
  user_email: string;
  replies: Reply[];
}

/**
 * FeedComponent shows posts and replies and provides create/reply/logout actions.
 * - Uses `SupabaseService` to load and mutate data via RPCs.
 */
@Component({
  standalone: true,
  selector: 'app-feed',
  imports: [CommonModule, FormsModule],
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class FeedComponent implements OnInit {
  // Local UI state
  posts: Post[] = [];
  newPost = '';
  replyText: Record<string, string> = {};

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    // initial load of feed items
    await this.loadFeed();
  }

  // Load all posts with replies from the backend
  async loadFeed() {
    try {
      const { data, error } = await this.supabase.getFeed();
      if (error) throw error;
      this.posts = data ?? [];
    } catch (err: any) {
      console.error('Error loading feed:', err.message);
    }
  }

  // Submit a new post and refresh the feed
  async submitPost() {
    if (!this.newPost.trim()) return;
    try {
      const { error } = await this.supabase.createPost(this.newPost);
      if (error) throw error;
      this.newPost = '';
      await this.loadFeed();
    } catch (err: any) {
      alert('Error creating post: ' + err.message);
    }
  }

  // Submit a reply tied to a specific post ID
  async submitReply(postId: string) {
    const content = this.replyText[postId];
    if (!content || !content.trim()) return;

    try {
      const { error } = await this.supabase.createReply(postId, content);
      if (error) throw error;
      this.replyText[postId] = '';
      await this.loadFeed();
    } catch (err: any) {
      alert('Error creating reply: ' + err.message);
    }
  }

  // Log the user out and send them to the login page
  async logout() {
    try {
      await this.supabase.signOut();
      alert('Logged out successfully!');
      this.router.navigate(['/auth']); // redirect to login page
    } catch (err: any) {
      alert('Error logging out: ' + err.message);
    }
  }
}
