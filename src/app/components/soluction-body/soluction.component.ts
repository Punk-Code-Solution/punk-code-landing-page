import { Component, Input } from '@angular/core';

@Component({
  selector: 'soluction-body',
  standalone: true,
  imports: [],
  templateUrl: './soluction.component.html',
  styleUrl: './soluction.component.css'
})
export class SoluctionComponentBody {
  @Input() icon: string = 'fa-code';
  @Input() title: string = 'Desenvolvimento Web';
  @Input() description: string = 'Criamos sites modernos e responsivos que impulsionam sua presença online e convertem visitantes em clientes.';
}
