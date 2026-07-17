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
import { CommonModule, isPlatformBrowser, NgClass, NgFor } from '@angular/common';
import { SchemaService } from '../../services/schema.services';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  description: string[];
  features: string[];
  images: ProjectImage[];
  placeholder?: boolean;
}

@Component({
  selector: 'page-projects',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, NgClass, NgFor],
  templateUrl: './page-projects.component.html',
  styleUrl: './page-projects.component.css',
})
export class PageProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly schemaId = 'projects-schema';
  private observer?: IntersectionObserver;

  animatedHero = false;
  animatedProjects: boolean[] = [];
  animatedFooter = false;

  projects: ProjectItem[] = [
    {
      id: 'app-pronto',
      name: 'App Pronto',
      tagline: 'Marketplace de serviços com agendamento, chat e teleconsulta',
      stack: ['React Native', 'NestJS', 'PostgreSQL', 'LiveKit', 'Mercado Pago'],
      description: [
        'O Pronto conecta clientes e profissionais em um ecossistema completo de agendamento de serviços — com foco em saúde e outras categorias.',
        'Do cadastro à consulta, a plataforma integra busca por especialidade, pagamentos via Mercado Pago, notificações push e atendimento por vídeo em tempo real.',
      ],
      features: [
        'Agendamento com validação de horários',
        'Chat e notificações in-app + push (FCM)',
        'Teleconsulta via LiveKit',
        'Pagamentos com Mercado Pago',
        'Perfis separados para cliente e profissional',
      ],
      images: [
        { src: 'images/projects/app-pronto-logo.png', alt: 'Logo do App Pronto' },
        { src: 'images/projects/app-pronto-preview.png', alt: 'Prévia promocional do App Pronto' },
      ],
    },
    {
      id: 'studio-style',
      name: 'Studio & Style',
      tagline: 'Gestão completa para salões de beleza',
      stack: ['Angular 19', 'Node.js', 'PostgreSQL', 'PrimeNG', 'Socket.io'],
      description: [
        'Sistema web desenvolvido para centralizar a operação de salões de beleza: agendamentos, clientes, equipe, serviços e financeiro em um único painel.',
        'Com dashboards em tempo real, relatórios e automações via WhatsApp, o Studio & Style reduz retrabalho e dá visibilidade ao dono do negócio.',
      ],
      features: [
        'Dashboard executivo com métricas',
        'Agendamentos em tempo real',
        'Gestão de clientes e funcionários',
        'Módulo financeiro com DRE e comissões',
        'Integração com WhatsApp Business API',
      ],
      images: [
        { src: 'images/projects/studio-style-logo.png', alt: 'Logo do Studio & Style' },
        { src: 'images/projects/studio-style-preview.png', alt: 'Dashboard do Studio & Style' },
      ],
    },
    {
      id: 'igreja-4-0',
      name: 'Igreja 4.0',
      tagline: 'Gestão digital para comunidades e ministérios',
      stack: ['Angular 19', 'NestJS', 'PostgreSQL', 'PrimeNG', 'Tailwind CSS'],
      description: [
        'Plataforma de gestão eclesiástica que unifica cadastro de membros, finanças, grupos, ministérios, agenda de eventos e escalas de voluntários.',
        'Desenvolvida para simplificar a administração da igreja, com perfis de acesso por cargo e relatórios exportáveis em PDF.',
      ],
      features: [
        'Gestão de membros e famílias',
        'Controle financeiro com gráficos e PDF',
        'Agenda e escalas por ministério',
        'Salas de oração online (Google Meet)',
        'Perfis: admin, pastor, tesoureiro, secretaria e líder',
      ],
      images: [
        { src: 'images/projects/igreja-4-0-dashboard.png', alt: 'Dashboard do Igreja 4.0' },
        { src: 'images/projects/igreja-4-0-login.png', alt: 'Tela de login do Igreja 4.0' },
      ],
    },
    {
      id: 'financas-news',
      name: 'Finanças News',
      tagline: 'Portal de análises financeiras com dados de mercado em tempo real',
      stack: ['Python', 'FastAPI', 'Turso', 'Tailwind CSS', 'Render'],
      description: [
        'Portal de análises do mercado brasileiro — Cripto, Economia, Dólar, Ações e mais — com contexto macroeconômico e orientação prática ao leitor, sempre com crédito e link para a fonte original.',
        'Cruza cotações e indicadores do Banco Central (Selic, IPCA, câmbio) com o cenário do dia, publicando matérias completas, gráficos e destaques editoriais em um site responsivo otimizado para SEO.',
      ],
      features: [
        'Análises com impacto no bolso e cenário projetado',
        'Ticker de cotações e evidência de mercado (BCB)',
        '10 categorias do mercado financeiro brasileiro',
        'Gráficos e indicadores em cada matéria',
        'Link transparente à fonte e publicação contínua',
      ],
      images: [
        { src: 'images/projects/financas-news-logo.png', alt: 'Logo Finanças News' },
        { src: 'images/projects/financas-news-preview.png', alt: 'Homepage do portal Finanças News com ticker de cotações e análises em destaque' },
      ],
    },
    {
      id: 'gamers-league',
      name: 'Gamers League',
      tagline: 'Ligas, partidas e analytics de performance em um só lugar',
      stack: ['Angular 19', 'Node.js', 'PostgreSQL', 'Redis', 'Python'],
      description: [
        'Plataforma que une organização de ligas e análise de performance — com foco inicial em Counter-Strike 2 e arquitetura preparada para outros jogos.',
        'Organizadores gerenciam times, chaveamentos, veto de mapas e resultados; jogadores enviam demos e recebem rating, radar de skills, evolução e dicas acionáveis vinculadas à competição.',
      ],
      features: [
        'Ligas em mata-mata, grupos + playoffs, 1v1 e pickup',
        'Veto de mapas e séries BO1/BO3',
        'Upload de demos CS2 com worker Python + Redis',
        'Analytics: rating, mira, posicionamento e utilitários',
        'Rankings, perfis por Steam ID e painel admin',
      ],
      images: [
        { src: 'images/projects/gamers-league-logo.jpg', alt: 'Logo Gamers League' },
        { src: 'images/projects/gamers-league-preview.png', alt: 'Dashboard de estatísticas do Gamers League' },
      ],
    },
  ];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.animatedProjects = new Array(this.projects.length).fill(false);

    const pageTitle = 'Projetos | Punk Code Solution';
    const pageDescription =
      'Conheça os projetos desenvolvidos pela Punk Code Solution: App Pronto, Studio & Style, Igreja 4.0, Finanças News e Gamers League.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    if (isPlatformBrowser(this.platformId)) {
      this.schemaService.addSchema(this.schemaId, {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description: pageDescription,
        url: 'https://www.punkcodesolution.com.br/projects',
        hasPart: this.projects.map(project => ({
          '@type': 'SoftwareApplication',
          name: project.name,
          description: project.tagline,
          applicationCategory: 'BusinessApplication',
        })),
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

          if (target.classList.contains('project-row')) {
            const index = Number(target.dataset['projectIndex']);
            if (!Number.isNaN(index) && !this.animatedProjects[index]) {
              this.animatedProjects[index] = true;
              changed = true;
            }
          }

          if (target.classList.contains('projects-footer')) {
            if (!this.animatedFooter) {
              this.animatedFooter = true;
              changed = true;
            }
          }
        }

        if (changed) {
          this.animatedProjects = [...this.animatedProjects];
          this.cdr.detectChanges();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    const rows = this.el.nativeElement.querySelectorAll('.project-row');
    rows.forEach((row: Element) => this.observer?.observe(row));

    const footer = this.el.nativeElement.querySelector('.projects-footer');
    if (footer) {
      this.observer.observe(footer);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.schemaService.removeSchema(this.schemaId);
  }

  isReversed(index: number): boolean {
    return index % 2 === 1;
  }

  isFromRight(index: number): boolean {
    return index % 2 === 1;
  }

  isProjectVisible(index: number): boolean {
    return this.animatedProjects[index];
  }
}
