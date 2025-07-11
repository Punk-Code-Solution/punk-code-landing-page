import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import  Swal from 'sweetalert2';

interface Imarker { // Renomeado para seguir a convenção
  position: google.maps.LatLngLiteral; // Use LatLngLiteral para facilitar
}

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    GoogleMapsModule,
    FormsModule
  ],
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.css'
})
export class PageContactComponent {

  nome: string = '';
  email: string = '';
  mensagem: string = '';
  telefone: string = '';
  empresa: string = '';
  servico: string = '';

  enviarProposta() {
    fetch('http://localhost:3001/send-proposta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
      console.log('E-mail enviado com sucesso!');
      Swal.fire({
        title: 'Email Enviado',
        text: 'Em algumas horas entraremos em contato, Nos vemos já',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#0D4318'
      })
    })
    .catch(error => {
      console.error('Erro ao enviar proposta:', error);
      Swal.fire({
        title: 'Eita!!',
        text: 'Algo não ocorreu como esperado, tente novamente em alguns instantes',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#d33'
      })
    });

  }

  // Defina as coordenadas como um objeto literal
  myLatLng: google.maps.LatLngLiteral = { lat: -14.837320895671775, lng: -39.026881435959844 };

  // Opções do mapa, incluindo o Map ID
  mapOptions: google.maps.MapOptions = {
    // 👇 **IMPORTANTE:** Substitua 'YOUR_MAP_ID' pelo seu ID do Mapa do Google Cloud
    mapId: 'YOUR_MAP_ID',
    // Você pode desabilitar a UI padrão se quiser um mapa mais limpo
    disableDefaultUI: true
  };

  // Defina o marcador usando o objeto literal
  marker: Imarker = {
    position: this.myLatLng
  };

  markers = [ this.marker ];
}
