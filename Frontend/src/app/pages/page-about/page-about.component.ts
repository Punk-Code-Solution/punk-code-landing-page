import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Title, Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    NgClass
  ],
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.css'
})
export class PageAboutComponent implements OnInit {

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
    private titleService: Title, // <-- ADICIONE ESTA LINHA
    private metaService: Meta
  ) {}

  ngOnInit() {

    const pageTitle = 'Sobre nós | Punk Code Solution';
    const pageDescription = 'Conheça a Punk Code Solution, sua parceira em soluções digitais inovadoras. Transformamos ideias em realidade com expertise em desenvolvimento web e tecnologia.';
    
    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    // Adiciona o script de Schema na <head>
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    // Executa as animações automaticamente ao carregar a página
    setTimeout(() => {
      this.isAnimated = true;
      this.animateElements();
    }, 100); // Pequeno delay para garantir que o DOM esteja renderizado
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  checkScroll() {
    // Check if we're in a browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Se já foi animado, não executa novamente
    if (this.isAnimated) {
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
    // Animate hero first
    setTimeout(() => {
      this.animatedElements.hero = true;
    }, 200);

    // Animate history section
    setTimeout(() => {
      this.animatedElements.history = true;
    }, 400);

    // Animate values section
    setTimeout(() => {
      this.animatedElements.values = true;
    }, 600);

    // Animate footer
    setTimeout(() => {
      this.animatedElements.footer = true;
    }, 800);
  }
}
