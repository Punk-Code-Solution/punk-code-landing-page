import { Component } from '@angular/core';
import { SoluctionComponentBody } from '../soluction-body/soluction.component';

@Component({
  selector: 'solution',
  standalone: true,
  imports: [
    SoluctionComponentBody
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent {

}
