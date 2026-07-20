import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import { BlogPost, BlogPostType } from '../models/blog-post.model';
import { BLOG_POSTS } from '../data/blog-posts';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly http = inject(HttpClient);
  private cache$?: Observable<BlogPost[]>;

  private sortPosts(posts: BlogPost[]): BlogPost[] {
    return [...posts].sort((a, b) => {
      const byDate = this.publishedAtTime(b.publishedAt) - this.publishedAtTime(a.publishedAt);
      if (byDate !== 0) {
        return byDate;
      }
      const byUpdated =
        this.publishedAtTime(b.updatedAt || b.publishedAt) -
        this.publishedAtTime(a.updatedAt || a.publishedAt);
      if (byUpdated !== 0) {
        return byUpdated;
      }
      return b.slug.localeCompare(a.slug);
    });
  }

  private publishedAtTime(value?: string): number {
    const raw = String(value || '');
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      return new Date(`${raw}T12:00:00`).getTime();
    }
    const time = new Date(raw).getTime();
    return Number.isFinite(time) ? time : 0;
  }

  private fallbackPosts(): BlogPost[] {
    return this.sortPosts(BLOG_POSTS);
  }

  getAll$(): Observable<BlogPost[]> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<{ posts: BlogPost[] }>(`${environment.apiUrl}/api/blog/posts`)
        .pipe(
          map(res => this.sortPosts(res.posts || [])),
          tap(posts => {
            if (!posts.length) {
              throw new Error('API retornou lista vazia');
            }
          }),
          catchError(() => of(this.fallbackPosts())),
          shareReplay(1)
        );
    }
    return this.cache$;
  }

  /** Invalida cache após novas publicações do radar */
  refresh(): void {
    this.cache$ = undefined;
  }

  getByType$(type: BlogPostType | 'all'): Observable<BlogPost[]> {
    return this.getAll$().pipe(
      map(posts => (type === 'all' ? posts : posts.filter(p => p.type === type)))
    );
  }

  getBySlug$(slug: string): Observable<BlogPost | undefined> {
    return this.http.get<{ post: BlogPost }>(`${environment.apiUrl}/api/blog/posts/${slug}`).pipe(
      map(res => res.post),
      catchError(() =>
        this.getAll$().pipe(map(posts => posts.find(p => p.slug === slug)))
      )
    );
  }

  getRelated$(slug: string, limit = 3): Observable<BlogPost[]> {
    return this.getAll$().pipe(
      map(posts => {
        const current = posts.find(p => p.slug === slug);
        if (!current) {
          return posts.filter(p => p.slug !== slug).slice(0, limit);
        }

        return posts
          .filter(p => p.slug !== slug)
          .map(p => {
            const sharedTags = p.tags.filter(tag => current.tags.includes(tag)).length;
            const sameType = p.type === current.type ? 1 : 0;
            return { post: p, score: sharedTags * 2 + sameType };
          })
          .sort(
            (a, b) =>
              b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt)
          )
          .slice(0, limit)
          .map(s => s.post);
      })
    );
  }

  formatDate(isoDate: string): string {
    const raw = String(isoDate || '');
    const date = /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? new Date(`${raw}T12:00:00`)
      : new Date(raw);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
