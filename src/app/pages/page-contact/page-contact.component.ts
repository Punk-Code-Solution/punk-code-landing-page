import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { NgFor } from '@angular/common'
import { Interface } from 'readline';

interface Imarkers {

  position: google.maps.LatLng;

}

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    GoogleMapsModule,
    NgFor
],
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.css'
})
export class PageContactComponent {

  myLatLng = new google.maps.LatLng(-14.837320895671775, -39.026881435959844);

  marker: Imarkers = {
    position: this.myLatLng
  }

  markers = [ this.marker ]

}
