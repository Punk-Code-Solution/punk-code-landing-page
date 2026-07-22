import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'service',
    imports: [CommonModule],
    templateUrl: './service.component.html',
    styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

  isAnimated = false;
  animatedElements: {
    title: boolean;
    description: boolean;
    list: boolean;
    button: boolean;
    image: boolean;
  } = {
    title: false,
    description: false,
    list: false,
    button: false,
    image: false
  };

  services = [
    'Desenvolvimento de Software Personalizado',
    'Manutenção e Suporte',
    'Integração de Sistemas',
    'Teste de Software'
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  checkScroll() {
    // Check if we're in a browser environment
    if (!isPlatformBrowser(this.platformId)) {
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
    // Animate title first
    setTimeout(() => {
      this.animatedElements.title = true;
    }, 200);

    // Animate description
    setTimeout(() => {
      this.animatedElements.description = true;
    }, 400);

    // Animate list items
    setTimeout(() => {
      this.animatedElements.list = true;
    }, 600);

    // Animate button
    setTimeout(() => {
      this.animatedElements.button = true;
    }, 800);

    // Animate image last
    setTimeout(() => {
      this.animatedElements.image = true;
    }, 1000);
  }
}

