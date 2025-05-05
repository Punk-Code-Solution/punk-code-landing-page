import { Component, signal } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';

interface Testimony {
  comment: string;
  autor: string;
  authorDetails: string;
}

@Component({
  selector: 'testimonials',
  standalone: true,
  imports: [
    CarouselComponent
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials: Testimony[] = [
    {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus faucibus nisi, eu hendrerit elit finibus in. Quisque non pretium tortor, vitae mattis nisi. Proin sodales velit non dolor cursus mattis.',
      autor: 'Sr. Zé 1',
      authorDetails: 'CEO do Zé Entregador',
    },
    {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus faucibus nisi, eu hendrerit elit finibus in. Quisque non pretium tortor, vitae mattis nisi. Proin sodales velit non dolor cursus mattis.',
      autor: 'Sr. Zé 2',
      authorDetails: 'CEO do Zé Entregador',
    },
    {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus faucibus nisi, eu hendrerit elit finibus in. Quisque non pretium tortor, vitae mattis nisi. Proin sodales velit non dolor cursus mattis.',
      autor: 'Sr. Zé 3',
      authorDetails: 'CEO do Zé Entregador',
    },
    {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus faucibus nisi, eu hendrerit elit finibus in. Quisque non pretium tortor, vitae mattis nisi. Proin sodales velit non dolor cursus mattis.',
      autor: 'Sr. Zé 4',
      authorDetails: 'CEO do Zé Entregador',
    },
    {
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus faucibus nisi, eu hendrerit elit finibus in. Quisque non pretium tortor, vitae mattis nisi. Proin sodales velit non dolor cursus mattis.',
      autor: 'Sr. Zé 5',
      authorDetails: 'CEO do Zé Entregador',
    }
  ];

  itemsPerPage = 2;

  pagesAmount = Math.ceil(this.testimonials.length / this.itemsPerPage);

  currentPage = signal(1);

  displayItem(itemPosition: number) {
    return this.currentPage() === Math.ceil(itemPosition / this.itemsPerPage);
  }

  changePage(currentPage: number) {
    this.currentPage.set(currentPage);
  }
}
