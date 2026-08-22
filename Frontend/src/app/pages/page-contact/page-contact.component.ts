import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Title, Meta } from '@angular/platform-browser';
import { FooterComponent } from '../../components/footer/footer.component';
import { environment } from '../../../environment/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { SchemaService } from '../../services/schema.services';
import { INTEREST_OPTIONS } from '../../data/services-offer';
import { whatsappUrl } from '../../data/whatsapp';
import Swal from 'sweetalert2';

@Component({
    selector: 'page-contact',
    imports: [NavbarComponent, FooterComponent, FormsModule, CommonModule, NgClass],
    templateUrl: './page-contact.component.html',
    styleUrl: './page-contact.component.css'
})
export class PageContactComponent implements OnInit, OnDestroy {
  private readonly schemaId = 'contact-schema';

  readonly interestOptions = INTEREST_OPTIONS;
  readonly whatsappHref = whatsappUrl(
    'Olá! Vim pela página de contato da Punk Code e quero conversar.'
  );

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
    private titleService: Title,
    private metaService: Meta,
    private schemaService: SchemaService
  ) {}

  ngOnInit() {
    const pageTitle = 'Contato | Punk Code Solution';
    const pageDescription =
      'Contate a Punk Code Solution para soluções digitais personalizadas. Estamos prontos para transformar suas ideias em realidade.';

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: pageDescription });

    if (isPlatformBrowser(this.platformId)) {
      this.schemaService.addSchema(this.schemaId, {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: pageTitle,
        description: pageDescription,
        url: 'https://www.punkcodesolution.com.br/contact',
        mainEntity: {
          '@type': 'Organization',
          name: 'Punk Code Solution',
          email: 'punkcodesolution@gmail.com',
          telephone: '+55-75-98811-0732',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Ilhéus',
            addressRegion: 'BA',
            addressCountry: 'BR',
          },
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
      this.animatedElements.button = true;
    }, 100);

    setTimeout(() => {
      this.animatedElements.hero = true;
    }, 200);

    setTimeout(() => {
      this.animatedElements.form = true;
    }, 400);

    setTimeout(() => {
      this.animatedElements.contactInfo = true;
    }, 600);

    setTimeout(() => {
      this.animatedElements.map = true;
    }, 800);

    setTimeout(() => {
      this.animatedElements.footer = true;
    }, 1000);
  }

  private readonly requiredFields = [
    { key: 'nome', label: 'Nome' },
    { key: 'email', label: 'Email' },
    { key: 'telefone', label: 'WhatsApp' },
    { key: 'servico', label: 'Solução de Interesse' },
  ] as const;

  private getMissingFields(): string[] {
    const values: Record<string, string> = {
      nome: this.nome,
      email: this.email,
      mensagem: this.mensagem,
      telefone: this.telefone,
      servico: this.servico,
    };

    return this.requiredFields
      .filter(field => !values[field.key]?.trim())
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
    const interestLabel =
      this.interestOptions.find(o => o.value === this.servico)?.label ?? this.servico;

    fetch(`${environment.apiUrl}/send-proposta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: this.nome,
        email: this.email,
        mensagem: this.mensagem || `Interesse em: ${interestLabel}`,
        telefone: this.telefone,
        empresa: this.empresa,
        servico: interestLabel,
      }),
    })
      .then(async response => {
        if (response.ok) {
          this.showAlert(
            'Email Enviado',
            'Em algumas horas entraremos em contato. Nos vemos já!',
            'success'
          );
          this.resetForm();
          return;
        }

        const payload = await response.json().catch(() => null);
        const message =
          payload?.message === 'Serviço de e-mail não configurado.'
            ? 'O serviço de e-mail está temporariamente indisponível. Tente novamente mais tarde.'
            : 'Algo não ocorreu como esperado, tente novamente em alguns instantes';

        this.showAlert('Eita!!', message, 'error');
      })
      .catch(() => {
        this.showAlert(
          'Eita!!',
          'Algo não ocorreu como esperado, tente novamente em alguns instantes',
          'error'
        );
      })
      .finally(() => {
        this.isLoading = false;
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
