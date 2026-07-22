import { Component, HostListener, ElementRef, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'solution',
    imports: [
        CommonModule
    ],
    templateUrl: './solution.component.html',
    styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {

  isAnimated = false;
  animatedCards: boolean[] = [];

  solutions = [
    {
      icon: 'fas fa-hand-holding-usd',
      title: 'Design que vende',
      description: 'Criamos designs modernos e estratégicos, focados em converter visitantes em clientes'
    },
    {
      icon: 'fa-solid fa-tv',
      title: 'Sistema sob medida',
      description: 'Desenvolvemos soluções personalizadas, feitas exclusivamente para alavancar o seu negócio'
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Suporte sem enrolação',
      description: 'Time técnico disponível para solucionar seu problema sem perda de tempo, sem enrolação.'
    }
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.checkScroll();
    // Initialize animated cards array
    this.animatedCards = new Array(this.solutions.length).fill(false);
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
      this.animateCards();
    }
  }

  animateCards() {
    this.solutions.forEach((_, index) => {
      setTimeout(() => {
        this.animatedCards[index] = true;
      }, index * 300); // 300ms delay between each card
    });
  }
}
