import { Component } from '@angular/core';
import { PROOF_POINTS } from '../../data/services-offer';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'proof-points',
  imports: [RevealOnScrollDirective],
  templateUrl: './proof-points.component.html',
  styleUrl: './proof-points.component.css',
})
export class ProofPointsComponent {
  readonly title = 'O que entregamos, na prática';
  readonly points = PROOF_POINTS;
}
