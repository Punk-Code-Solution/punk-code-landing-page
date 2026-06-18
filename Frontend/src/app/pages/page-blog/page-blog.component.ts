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
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SchemaService } from '../../services/schema.services';

@Component({
  selector: 'page-blog',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, NgClass, RouterLink],
  templateUrl: './page-blog.component.html',
  styleUrl: './page-blog.component.css',
})
export class PageBlogComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly schemaId = 'blog-schema';
  private observer?: IntersectionObserver;

  animatedHero = false;
  animatedCta = false;
  animatedFooter = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const pageTitle = 'Blog | Punk Code Solution';
    const pageDescription =
      'Artigos, novidades e insights sobre desenvolvimento web, tecnologia e inovação digital pela Punk Code Solution.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    if (isPlatformBrowser(this.platformId)) {
      this.schemaService.addSchema(this.schemaId, {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: pageTitle,
        description: pageDescription,
        url: 'https://www.punkcodesolution.com.br/blog',
        publisher: {
          '@type': 'Organization',
          name: 'Punk Code Solution',
        },
      });

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

    this.observer = new IntersectionObserver(
      entries => {
        let changed = false;

        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const target = entry.target as HTMLElement;

          if (target.classList.contains('blog-cta')) {
            if (!this.animatedCta) {
              this.animatedCta = true;
              changed = true;
            }
          }

          if (target.classList.contains('blog-footer')) {
            if (!this.animatedFooter) {
              this.animatedFooter = true;
              changed = true;
            }
          }
        }

        if (changed) {
          this.cdr.detectChanges();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    this.el.nativeElement
      .querySelectorAll('.blog-cta, .blog-footer')
      .forEach((node: Element) => this.observer?.observe(node));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.schemaService.removeSchema(this.schemaId);
  }
}
