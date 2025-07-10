import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    NgFor,
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
    .then(response => response.json())
      .catch(error => {
        console.error('Erro ao enviar proposta:', error);
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
