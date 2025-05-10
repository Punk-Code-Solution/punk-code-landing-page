import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent {
  faqs = [
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis, velit eget pretium elementum, lacus nisi auctor libero, id varius felis massa non dui. Mauris vel ex in orci scelerisque iaculis vitae ut massa.',
      open: true,
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis, velit eget pretium elementum, lacus nisi auctor libero, id varius felis massa non dui. Mauris vel ex in orci scelerisque iaculis vitae ut massa.',
      open: false,
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis, velit eget pretium elementum, lacus nisi auctor libero, id varius felis massa non dui. Mauris vel ex in orci scelerisque iaculis vitae ut massa.',
      open: false,
    },
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis, velit eget pretium elementum, lacus nisi auctor libero, id varius felis massa non dui. Mauris vel ex in orci scelerisque iaculis vitae ut massa.',
      open: false,
    },
  ];

  toggle(index: number) {
    this.faqs = this.faqs.map((faq, i) => ({
      ...faq,
      open: i === index ? !faq.open : false,
    }));
  }
}
