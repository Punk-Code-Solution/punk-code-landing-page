import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-soluction',
  standalone: true,
  imports: [],
  templateUrl: './soluction.component.html',
  styleUrl: './soluction.component.css'
})
export class SoluctionComponent {
  @Input() icon: string = 'fa-code';
  @Input() title: string = 'Desenvolvimento Web';
  @Input() description: string = 'Criamos sites modernos e responsivos que impulsionam sua presença online e convertem visitantes em clientes.';
}
