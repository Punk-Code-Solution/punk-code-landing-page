import { ApplicationRef, Component, EventEmitter, OnDestroy, OnInit, Output, computed, input, signal } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  constructor(
    private applicationRef: ApplicationRef
  ) { }

  intervalId: any;
  intervalTime = 10000;

  currentPage = signal(1);

  pagesAmount = input(0, { alias: 'pages-amount' });
  pages = computed(() => Array.from({ length: this.pagesAmount() }, (value, index) => (index + 1)));

  @Output() pageChange = new EventEmitter<number>();

  isCurrentPage(page: number) {
    return this.currentPage() === page;
  }

  previousClick() {
    let currentPage = this.currentPage();

    currentPage -= 1;
    if (currentPage < 1) {
      currentPage = this.pagesAmount();
    }

    this.currentPage.set(currentPage);
    this.pageChange.emit(currentPage);
    this.resetInterval();
  }

  nextClick() {
    let currentPage = this.currentPage();

    currentPage += 1;
    if (currentPage > this.pagesAmount()) {
      currentPage = 1;
    }

    this.currentPage.set(currentPage);
    this.pageChange.emit(currentPage);
    this.resetInterval();
  }

  resetInterval() {
    clearInterval(this.intervalId);

    this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      this.intervalId = setInterval(() => this.nextClick(), this.intervalTime);
    });
  }

  ngOnInit() {
    this.applicationRef.isStable.pipe(first((isStable) => isStable)).subscribe(() => {
      this.intervalId = setInterval(() => this.nextClick(), this.intervalTime);
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
