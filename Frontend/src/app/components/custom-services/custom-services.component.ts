import { Component } from '@angular/core';
import { whatsappUrl } from '../../data/whatsapp';
import { SERVICE_OFFERS, SERVICE_PROCESS } from '../../data/services-offer';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'custom-services',
  imports: [RevealOnScrollDirective],
  templateUrl: './custom-services.component.html',
  styleUrl: './custom-services.component.css',
})
export class CustomServicesComponent {
  readonly offers = SERVICE_OFFERS;
  readonly steps = SERVICE_PROCESS;
  readonly specialistHref = whatsappUrl(
    'Olá! Quero falar com um especialista sobre um projeto sob medida.'
  );
  readonly auditHref = whatsappUrl('Olá! Quero uma auditoria com o QA Pack.');
}
