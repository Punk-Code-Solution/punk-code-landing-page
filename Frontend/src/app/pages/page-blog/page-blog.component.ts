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
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { SchemaService } from '../../services/schema.services';
import { BlogService } from '../../services/blog.service';
import { BlogPost, BlogPostType } from '../../models/blog-post.model';
import { Subscription } from 'rxjs';

type BlogFilter = BlogPostType | 'all';

@Component({
    selector: 'page-blog',
    imports: [NavbarComponent, FooterComponent, CommonModule, NgClass, RouterLink],
    templateUrl: './page-blog.component.html',
    styleUrl: './page-blog.component.css'
})
export class PageBlogComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly schemaId = 'blog-schema';
  private readonly pageSize = 6;
  private observer?: IntersectionObserver;
  private postsSub?: Subscription;
  private querySub?: Subscription;

  animatedHero = false;
  animatedList = false;
  animatedCta = false;
  animatedFooter = false;
  loading = true;

  filter: BlogFilter = 'all';
  allPosts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  posts: BlogPost[] = [];

  currentPage = 1;
  totalPages = 1;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const pageTitle = 'Blog | Punk Code Solution';
    const pageDescription =
      'Artigos originais e radar de tecnologia da Punk Code Solution: desenvolvimento, SEO, produto e inovação — com crédito às fontes e foco em trazer valor ao seu negócio.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    this.querySub = this.route.queryParamMap.subscribe(params => {
      const filterParam = params.get('tipo');
      if (filterParam === 'original' || filterParam === 'radar' || filterParam === 'all') {
        this.filter = filterParam;
      }

      const pageParam = Number(params.get('page') || '1');
      this.currentPage = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;
      this.applyFilter(false);
      this.cdr.markForCheck();
    });

    this.blogService.refresh();
    this.postsSub = this.blogService.getAll$().subscribe(posts => {
      this.allPosts = posts;
      this.applyFilter(false);
      this.loading = false;
      this.setupSchema(pageTitle, pageDescription);
      this.cdr.markForCheck();
      setTimeout(() => this.observeList(), 0);
    });

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.animatedHero = true;
        this.cdr.markForCheck();
      }, 100);
    }
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.observeList();
  }

  private observeList(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      entries => {
        let changed = false;

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const target = entry.target as HTMLElement;

          if (target.classList.contains('blog-list') && !this.animatedList) {
            this.animatedList = true;
            changed = true;
          }

          if (target.classList.contains('blog-cta') && !this.animatedCta) {
            this.animatedCta = true;
            changed = true;
          }

          if (target.classList.contains('blog-footer') && !this.animatedFooter) {
            this.animatedFooter = true;
            changed = true;
          }
        }

        if (changed) {
          this.cdr.detectChanges();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    this.el.nativeElement
      .querySelectorAll('.blog-list, .blog-cta, .blog-footer')
      .forEach((node: Element) => this.observer?.observe(node));
  }

  private setupSchema(pageTitle: string, pageDescription: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.schemaService.addSchema(this.schemaId, {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: pageTitle,
      description: pageDescription,
      url: 'https://www.punkcodesolution.com.br/blog',
      publisher: {
        '@type': 'Organization',
        name: 'Punk Code Solution',
        url: 'https://www.punkcodesolution.com.br',
      },
      blogPost: this.allPosts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.publishedAt,
        url: `https://www.punkcodesolution.com.br/blog/${post.slug}`,
        description: post.excerpt,
      })),
    });
  }

  ngOnDestroy(): void {
    this.postsSub?.unsubscribe();
    this.querySub?.unsubscribe();
    this.observer?.disconnect();
    this.schemaService.removeSchema(this.schemaId);
  }

  setFilter(filter: BlogFilter): void {
    this.filter = filter;
    this.currentPage = 1;
    this.syncQuery();
    this.applyFilter(true);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.syncQuery();
    this.applyFilter(true);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private syncQuery(): void {
    const queryParams: Record<string, string | null> = {
      page: this.currentPage > 1 ? String(this.currentPage) : null,
      tipo: this.filter !== 'all' ? this.filter : null,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private applyFilter(scrollToList: boolean): void {
    const filtered =
      this.filter === 'all'
        ? this.allPosts
        : this.allPosts.filter(post => post.type === this.filter);

    // Garante notícia mais recente primeiro também após filtro
    this.filteredPosts = [...filtered].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime() ||
        (b.updatedAt || b.publishedAt).localeCompare(a.updatedAt || a.publishedAt) ||
        b.slug.localeCompare(a.slug)
    );

    this.totalPages = Math.max(1, Math.ceil(this.filteredPosts.length / this.pageSize));
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    this.posts = this.filteredPosts.slice(start, start + this.pageSize);

    if (scrollToList && isPlatformBrowser(this.platformId)) {
      const list = this.el.nativeElement.querySelector('.blog-toolbar') as HTMLElement | null;
      list?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  formatDate(iso: string): string {
    return this.blogService.formatDate(iso);
  }

  typeLabel(type: BlogPostType): string {
    return type === 'original' ? 'Artigo' : 'Radar';
  }
}
