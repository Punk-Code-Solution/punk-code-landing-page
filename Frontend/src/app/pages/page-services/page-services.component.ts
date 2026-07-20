import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ServiceSolutionComponent } from '../../components/service-solution/service-solution.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgClass, NgFor } from '@angular/common';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SchemaService } from '../../services/schema.services';

@Component({
  selector: 'page-services',
  standalone: true,
  imports: [
    NavbarComponent,
    ServiceSolutionComponent,
    FooterComponent,
    NgFor,
    NgClass,
    CommonModule
  ],
  templateUrl: './page-services.component.html',
  styleUrl: './page-services.component.css'
})
export class PageServicesComponent implements OnInit, OnDestroy {

  isAnimated = false;
  animatedElements: {
    hero: boolean;
    cards: boolean;
    section: boolean;
    steps: boolean;
    footer: boolean;
  } = {
    hero: false,
    cards: false,
    section: false,
    steps: false,
    footer: false
  };

  services = [
    {
      icon: 'fa fa-code', // Exemplo de classe de ícone
      title: 'Desenvolvimento Web',
      description: 'Sites institucionais, e-commerces e aplicações web modernas e responsivas.',
      features: ['Design responsivo', 'SEO otimizado', 'Performance alta', 'Segurança avançada']
    },
    {
      icon: 'fa fa-mobile',
      title: 'Desenvolvimento Mobile',
      description: 'Aplicações nativas e híbridas para Android e iOS, focadas na experiência do usuário.',
      features: ['Interface intuitiva', 'Notificações push', 'Integração com APIs', 'Publicação nas lojas']
    },
    // {
    //   icon: 'fa fa-cloud',
    //   title: 'Soluções em Nuvem',
    //   description: 'Infraestrutura escalável e segura na nuvem para suas aplicações e dados.',
    //   features: ['Arquitetura serverless', 'Bancos de dados gerenciados', 'CI/CD', 'Monitoramento 24/7']
    // },
    {
      icon: 'fa-solid fa-bug',
      title: 'Teste de Software',
      description: 'Consultoria em testes de software e automação de testes.',
      features: ['Testes automatizados', 'Testes de unidade', 'Testes de integração', 'Testes de sistema']
    }
  ];

  private schemaId = 'service-schema';

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, // <-- ADICIONE ESTA LINHA
    private metaService: Meta,
    private schemaService: SchemaService
  ) {}

  ngOnInit() {

    const pageTitle = 'Desenvolvimento Web | Teste de Software | Punk Code Solution';
    const pageDescription = 'Oferecemos soluções digitais completas, incluindo Desenvolvimento Web e Teste de Software, para transformar sua empresa.';
    
    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    // Gera o JSON-LD para os Serviços
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": this.services.map((service, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": service.title,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "Punk Code Solution"
        }
      }))
    };

    // Adiciona o schema de serviços na <head>
    if (isPlatformBrowser(this.platformId)) {
      this.schemaService.addSchema(this.schemaId, serviceSchema);
    }

    // Executa as animações automaticamente ao carregar a página
    setTimeout(() => {
      this.isAnimated = true;
      this.animateElements();
    }, 100); // Pequeno delay para garantir que o DOM esteja renderizado
  }

  ngOnDestroy(): void {
    // Remove o schema específico desta página ao sair
    this.schemaService.removeSchema(this.schemaId);
  }

  @HostListener('window:scroll')
  @HostListener('window:resize')
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

    // Animate service cards
    setTimeout(() => {
      this.animatedElements.cards = true;
    }, 400);

    // Animate how we work section
    setTimeout(() => {
      this.animatedElements.section = true;
    }, 600);

    // Animate steps
    setTimeout(() => {
      this.animatedElements.steps = true;
    }, 800);

    // Animate footer
    setTimeout(() => {
      this.animatedElements.footer = true;
    }, 1000);
  }

  getStepIcon(index: number): string {
    const icons = [
      'fa-solid fa-magnifying-glass-chart',
      'fa-solid fa-list-check',
      'fa-solid fa-code',
      'fa-solid fa-rocket'
    ];
    return icons[index] || '';
  }

  getStepTitle(index: number): string {
    const titles = [
      '1. Análise',
      '2. Planejamento',
      '3. Desenvolvimento',
      '4. Entrega'
    ];
    return titles[index] || '';
  }

  getStepDescription(index: number): string {
    const descriptions = [
      'Entendemos profundamente suas necessidades e objetivos de negócio.',
      'Criamos uma estratégia detalhada e cronograma de desenvolvimento.',
      'Codificamos sua solução com as melhores práticas e tecnologias.',
      'Implementamos, testamos e colocamos sua solução em produção.'
    ];
    return descriptions[index] || '';
  }
}

