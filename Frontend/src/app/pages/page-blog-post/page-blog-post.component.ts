import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SchemaService } from '../../services/schema.services';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { Subscription, switchMap, of } from 'rxjs';

@Component({
  selector: 'page-blog-post',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, NgClass, RouterLink],
  templateUrl: './page-blog-post.component.html',
  styleUrl: './page-blog-post.component.css',
})
export class PageBlogPostComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly schemaId = 'blog-post-schema';
  private routeSub?: Subscription;
  private observer?: IntersectionObserver;

  post?: BlogPost;
  related: BlogPost[] = [];
  loading = true;
  animatedHero = false;
  animatedBody = false;
  animatedFooter = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap
      .pipe(
        switchMap(params => {
          const slug = params.get('slug') ?? '';
          this.loading = true;
          this.post = undefined;
          this.related = [];
          this.animatedHero = false;
          this.animatedBody = false;
          return this.blogService.getBySlug$(slug).pipe(
            switchMap(post => {
              if (!post) {
                this.router.navigateByUrl('/blog');
                return of({ post: undefined as BlogPost | undefined, related: [] as BlogPost[] });
              }
              return this.blogService.getRelated$(slug).pipe(
                switchMap(related => of({ post, related }))
              );
            })
          );
        })
      )
      .subscribe(({ post, related }) => {
        if (!post) {
          return;
        }
        this.post = post;
        this.related = related;
        this.loading = false;
        this.applySeo(post);

        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.animatedHero = true;
            this.animatedBody = true;
            this.cdr.markForCheck();
            this.observeFooter();
          }, 80);
        }

        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.observeFooter();
  }

  private observeFooter(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.animatedFooter) {
            this.animatedFooter = true;
            this.cdr.detectChanges();
          }
        }
      },
      { threshold: 0.1 }
    );

    const footer = this.el.nativeElement.querySelector('.blog-post-footer');
    if (footer) {
      this.observer.observe(footer);
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.observer?.disconnect();
    this.schemaService.removeSchema(this.schemaId);
  }

  formatDate(iso: string): string {
    return this.blogService.formatDate(iso);
  }

  typeLabel(type: BlogPost['type']): string {
    return type === 'original' ? 'Artigo original' : 'Radar';
  }

  private applySeo(post: BlogPost): void {
    const pageTitle = `${post.title} | Blog Punk Code`;
    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: post.excerpt });

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.schemaService.removeSchema(this.schemaId);
    this.schemaService.addSchema(this.schemaId, {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: {
        '@type': 'Organization',
        name: 'Punk Code Solution',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Punk Code Solution',
        url: 'https://www.punkcodesolution.com.br',
      },
      mainEntityOfPage: `https://www.punkcodesolution.com.br/blog/${post.slug}`,
      keywords: post.tags.join(', '),
    });
  }
}
