import { Component } from '@angular/core';
import { ServiceBodyComponent } from '../../components/service-body/service-body.component';

@Component({
  selector: 'page-services',
  standalone: true,
  imports: [
    ServiceBodyComponent    
  ],
  templateUrl: './page-services.component.html',
  styleUrl: './page-services.component.css'
})
export class PageServicesComponent {

}
