import { Component, HostListener, OnInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {

  isAnimated = false;
  animatedItems: boolean[] = [];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.checkScroll();
    // Initialize animated items array
    this.animatedItems = new Array(this.faqs.length).fill(false);
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
      // Animate items with staggered delay
      this.animateItems();
    }
  }

  animateItems() {
    this.faqs.forEach((_, index) => {
      setTimeout(() => {
        this.animatedItems[index] = true;
      }, index * 200); // 200ms delay between each item
    });
  }

  faqs = [
    {
      question: 'Quais tipos de sites vocês desenvolvem?',
      answer:
        'Desenvolvemos sites institucionais profissionais voltados para empresas de diversos segmentos. Nosso foco é criar páginas modernas, responsivas e otimizadas para buscadores (SEO), com ênfase em apresentar sua marca, serviços e diferenciais de forma clara e eficaz.',
      open: true,
    },
    {
      question: 'Quanto tempo leva para desenvolver um site?',
      answer:
        'O tempo de desenvolvimento de um site pode variar, depende do escopo do projeto, quantidade de páginas e prontidão dos materiais fornecidos pelo cliente.',
      open: false,
    },
    {
      question: 'O site será adaptado para celulares e tablets?',
      answer:
        'Todos os nossos sites são desenvolvidos com design responsivo, garantindo uma boa experiência de navegação em dispositivos móveis, como smartphones e tablets.',
      open: false,
    },
    {
      question:
        'Posso solicitar novas funcionalidades depois que o site estiver pronto?',
      answer:
        'Podemos adicionar novas seções, formulários, integrações ou qualquer funcionalidade que sua empresa precise, mesmo após o site estar publicado. Essas solicitações são tratadas dentro do nosso suporte ou como serviços adicionais, dependendo da complexidade.',
      open: false,
    },
  ];

  toggle(index: number) {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      open: i === index ? !faq.open : false,
    }));
  }
}
