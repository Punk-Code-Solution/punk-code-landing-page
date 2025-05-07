import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainBannerComponent } from '../../components/main-banner/main-banner.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { PageServicesComponent } from '../page-services/page-services.component';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [
    NavbarComponent,
    MainBannerComponent,
    TestimonialsComponent,
    PageServicesComponent
  ],
  templateUrl: './page-home.component.html',
  styleUrl: './page-home.component.css'
})
export class PageHomeComponent {

}
