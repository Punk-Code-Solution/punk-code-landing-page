import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ServiceSolutionComponent } from '../../components/service-solution/service-solution.component';

@Component({
  selector: 'page-services',
  standalone: true,
  imports: [
    NavbarComponent,
    ServiceSolutionComponent
  ],
  templateUrl: './page-services.component.html',
  styleUrl: './page-services.component.css'
})
export class PageServicesComponent {

}

