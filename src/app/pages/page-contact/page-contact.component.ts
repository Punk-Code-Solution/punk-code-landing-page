import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    GoogleMapsModule
],
  templateUrl: './page-contact.component.html',
  styleUrl: './page-contact.component.css'
})
export class PageContactComponent {

}
