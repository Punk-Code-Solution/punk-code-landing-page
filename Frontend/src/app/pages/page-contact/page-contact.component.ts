import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Title, Meta } from '@angular/platform-browser';
import { FooterComponent } from "../../components/footer/footer.component";
import { environment } from '../../../environment/environment.prod';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgClass } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule, NgClass],
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.css',
})
export class PageContactComponent implements OnInit {
  nome = '';
  email = '';
  mensagem = '';
  telefone = '';
  empresa = '';
  servico = '';
  isLoading = false;

  isAnimated = false;
  animatedElements: {
    button: boolean;
    hero: boolean;
    form: boolean;
    contactInfo: boolean;
    map: boolean;
    footer: boolean;
  } = {
    button: false,
    hero: false,
    form: false,
    contactInfo: false,
    map: false,
    footer: false
  };

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, // <-- ADICIONE ESTA LINHA
    private metaService: Meta
  ) {}

  ngOnInit() {

    const pageTitle = 'Contado | Punk Code Solution';
    const pageDescription = 'Contate a Punk Code Solution para soluções digitais personalizadas. Estamos prontos para transformar suas ideias em realidade.';
    
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

    setTimeout(() => {
      this.animatedElements.button = true;
    }, 100);

    // Animate hero first
    setTimeout(() => {
      this.animatedElements.hero = true;
    }, 200);

    // Animate form
    setTimeout(() => {
      this.animatedElements.form = true;
    }, 400);

    // Animate contact info
    setTimeout(() => {
      this.animatedElements.contactInfo = true;
    }, 600);

    // Animate map
    setTimeout(() => {
      this.animatedElements.map = true;
    }, 800);

    // Animate footer
    setTimeout(() => {
      this.animatedElements.footer = true;
    }, 1000);
  }

  private requiredFields = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'mensagem', label: 'Mensagem' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'servico', label: 'Serviço' },
  ];

  private getMissingFields(): string[] {
    return this.requiredFields
      .filter(field => !(this as any)[field.key])
      .map(field => field.label);
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok',
      confirmButtonColor: icon === 'success' ? '#0D4318' : '#d33',
    });
  }

  enviarProposta() {
    if (this.isLoading) return;
    const missingFields = this.getMissingFields();
    if (missingFields.length) {
      this.showAlert(
        'Opa!',
        `Alguns campos estão faltando: ${missingFields.join(', ')}`,
        'error'
      );
      return;
    }

    this.isLoading = true;
    fetch(`${environment.apiUrl}/send-proposta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: this.nome,
        email: this.email,
        mensagem: this.mensagem,
        telefone: this.telefone,
        empresa: this.empresa,
        servico: this.servico,
      }),
    })
      .then(response => {
        this.isLoading = false;
        if (response.ok) {
          this.showAlert(
            'Email Enviado',
            'Em algumas horas entraremos em contato, Nos vemos já',
            'success'
          );
          this.resetForm();
        } else {
          this.showAlert(
            'Eita!!',
            'Algo não ocorreu como esperado, tente novamente em alguns instantes',
            'error'
          );
        }
      })
      .catch(() => {
        this.isLoading = false;
        this.showAlert(
          'Eita!!',
          'Algo não ocorreu como esperado, tente novamente em alguns instantes',
          'error'
        );
      });
  }

  private resetForm() {
    this.nome = '';
    this.email = '';
    this.mensagem = '';
    this.telefone = '';
    this.empresa = '';
    this.servico = '';
  }
}
