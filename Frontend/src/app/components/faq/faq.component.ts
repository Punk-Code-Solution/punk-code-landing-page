import { Component, HostListener, OnInit, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  isAnimated = false;
  animatedItems: boolean[] = [];

  faqs = [
    {
      question: 'Qual a diferença entre um produto pronto e um projeto sob medida?',
      answer:
        'Os produtos prontos (como Igreja 4.0 ou Studio & Style) você assina e começa a usar com planos claros. O sob medida é quando o seu processo não cabe em um produto padrão — aí desenhamos e construímos a solução exclusiva para o seu negócio.',
      open: true,
    },
    {
      question: 'Quanto tempo leva para começar a usar um produto pronto?',
      answer:
        'Na maioria dos casos, após alinharmos o plano e o acesso, você já consegue operar em poucos dias. O tempo exato depende do tamanho da equipe e do volume de dados que você quiser organizar no início.',
      open: false,
    },
    {
      question: 'O que inclui o diagnóstico de um projeto sob medida?',
      answer:
        'Mapeamos o problema de negócio, os gargalos da operação e o que precisa mudar. Com isso, montamos um escopo objetivo: o que será entregue, em que ordem e com qual expectativa de resultado.',
      open: false,
    },
    {
      question: 'Como funciona o suporte depois da entrega ou da assinatura?',
      answer:
        'Você conta com acompanhamento contínuo para manter a operação estável. Ajustes e evoluções entram conforme o plano contratado ou como evolução combinada do projeto.',
      open: false,
    },
    {
      question: 'Posso migrar de planilha ou de outro sistema?',
      answer:
        'Sim. Avaliamos o que você já usa, o que vale a pena trazer e como fazer a transição com o menor impacto no dia a dia da equipe.',
      open: false,
    },
    {
      question: 'O Finanças News está à venda?',
      answer:
        'Não. O Finanças News é um projeto que desenvolvemos — um case real. Se você quiser algo parecido para o seu negócio, fazemos sob medida.',
      open: false,
    },
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.checkScroll();
    this.animatedItems = new Array(this.faqs.length).fill(false);
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  checkScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > componentPosition) {
      this.isAnimated = true;
      this.animateItems();
    }
  }

  animateItems() {
    this.faqs.forEach((_, index) => {
      setTimeout(() => {
        this.animatedItems[index] = true;
      }, index * 200);
    });
  }

  toggle(index: number) {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      open: i === index ? !faq.open : false,
    }));
  }
}
