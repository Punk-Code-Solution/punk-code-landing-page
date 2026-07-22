import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Title, Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { SchemaService } from '../../services/schema.services';

@Component({
    selector: 'page-about',
    imports: [
        NavbarComponent,
        FooterComponent,
        CommonModule,
        NgClass
    ],
    templateUrl: './page-about.component.html',
    styleUrl: './page-about.component.css'
})
export class PageAboutComponent implements OnInit, OnDestroy {
  private readonly schemaId = 'about-schema';

  isAnimated = false;
  animatedElements: {
    hero: boolean;
    history: boolean;
    values: boolean;
    footer: boolean;
  } = {
    hero: false,
    history: false,
    values: false,
    footer: false
  };

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService
  ) {}

  ngOnInit() {
    const pageTitle = 'Sobre nós | Punk Code Solution';
    const pageDescription =
      'Conheça a Punk Code Solution, sua parceira em soluções digitais inovadoras. Transformamos ideias em realidade com expertise em desenvolvimento web e tecnologia.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    if (isPlatformBrowser(this.platformId)) {
      this.schemaService.addSchema(this.schemaId, {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: pageTitle,
        description: pageDescription,
        url: 'https://www.punkcodesolution.com.br/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'Punk Code Solution',
          url: 'https://www.punkcodesolution.com.br/',
        },
      });
    }

    setTimeout(() => {
      this.isAnimated = true;
      this.animateElements();
    }, 100);
  }

  ngOnDestroy(): void {
    this.schemaService.removeSchema(this.schemaId);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
  checkScroll() {
    if (!isPlatformBrowser(this.platformId) || this.isAnimated) {
      return;
    }

    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > componentPosition) {
      this.isAnimated = true;
      this.animateElements();
    }
  }

  animateElements() {
    setTimeout(() => {
      this.animatedElements.hero = true;
    }, 200);

    setTimeout(() => {
      this.animatedElements.history = true;
    }, 400);

    setTimeout(() => {
      this.animatedElements.values = true;
    }, 600);

    setTimeout(() => {
      this.animatedElements.footer = true;
    }, 800);
  }
}
