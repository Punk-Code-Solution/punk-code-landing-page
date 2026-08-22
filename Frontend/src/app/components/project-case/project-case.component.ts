import { Component } from '@angular/core';
import { FINANCAS_NEWS_CASE } from '../../data/cases';
import { RevealOnScrollDirective } from '../../shared/reveal-on-scroll.directive';

@Component({
  selector: 'project-case',
  imports: [RevealOnScrollDirective],
  templateUrl: './project-case.component.html',
  styleUrl: './project-case.component.css',
})
export class ProjectCaseComponent {
  readonly project = FINANCAS_NEWS_CASE;
}
