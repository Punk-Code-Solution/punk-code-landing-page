import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { environment } from '../../../environment/environment.prod';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.css',
})
export class PageContactComponent {
  nome = '';
  email = '';
  mensagem = '';
  telefone = '';
  empresa = '';
  servico = '';
  isLoading = false;

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
