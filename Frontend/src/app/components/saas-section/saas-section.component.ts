import { Component } from '@angular/core';
import { SAAS_PRODUCTS } from '../../data/products';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'saas-section',
  imports: [RevealOnScrollDirective],
  templateUrl: './saas-section.component.html',
  styleUrl: './saas-section.component.css',
})
export class SaasSectionComponent {
  readonly products = SAAS_PRODUCTS;
}
