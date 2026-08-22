import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { INTEREST_OPTIONS } from '../../data/services-offer';
import { whatsappUrl } from '../../data/whatsapp';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'lead-capture',
  imports: [FormsModule, CommonModule, RevealOnScrollDirective],
  templateUrl: './lead-capture.component.html',
  styleUrl: './lead-capture.component.css',
})
export class LeadCaptureComponent {
  readonly interestOptions = INTEREST_OPTIONS;
  readonly whatsappHref = whatsappUrl(
    'Olá! Vim pelo site da Punk Code e quero conversar sobre uma solução.'
  );

  nome = '';
  email = '';
  telefone = '';
  servico = '';
  mensagem = '';
  isLoading = false;

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

    const missing: string[] = [];
    if (!this.nome.trim()) missing.push('Nome');
    if (!this.email.trim()) missing.push('E-mail');
    if (!this.telefone.trim()) missing.push('WhatsApp');
    if (!this.servico.trim()) missing.push('Solução de Interesse');

    if (missing.length) {
      this.showAlert('Opa!', `Alguns campos estão faltando: ${missing.join(', ')}`, 'error');
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
        telefone: this.telefone,
        empresa: '',
        servico: interestLabel,
        mensagem: this.mensagem || `Interesse em: ${interestLabel}`,
      }),
    })
      .then(async response => {
        if (response.ok) {
          this.showAlert(
            'Proposta enviada',
            'Em algumas horas entraremos em contato. Nos vemos já!',
            'success'
          );
          this.nome = '';
          this.email = '';
          this.telefone = '';
          this.servico = '';
          this.mensagem = '';
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
}
