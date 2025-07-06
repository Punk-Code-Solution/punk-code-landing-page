import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'service-solution',
  standalone: true,
  imports: [NgFor],
  templateUrl: './service-solution.component.html',
  styleUrl: './service-solution.component.css'
})
export class ServiceSolutionComponent {

  @Input() icon!: string;
  @Input() title!: string;
  @Input() description!:string;
  @Input() features!: string[];

}
