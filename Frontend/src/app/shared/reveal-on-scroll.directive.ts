import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[revealOnScroll]',
  standalone: true,
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  /** Atraso da transição (ex.: "0.12s"). */
  @Input() revealDelay = '0s';

  private observer?: IntersectionObserver;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'reveal');
    host.style.setProperty('--reveal-delay', this.revealDelay);

    if (!isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderer.addClass(host, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          this.renderer.addClass(host, 'is-visible');
          this.observer?.unobserve(host);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
