import { ApplicationRef, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, computed, inject, input, signal } from '@angular/core';
import { first } from 'rxjs';
import { WINDOW } from '../../tokens';

@Component({
    selector: 'carousel',
    imports: [],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  private window = inject(WINDOW);

  constructor(
    private applicationRef: ApplicationRef
  ) { }

  intervalId: any;
  intervalTime = 10000;

  currentPage = signal(1);

  pagesAmount = input(0, { alias: 'pages-amount' });
  pages = computed(() => Array.from({ length: this.pagesAmount() }, (value, index) => (index + 1)));

  @Output() pageChange = new EventEmitter<number>();
  @Output() windowResize = new EventEmitter<number>();

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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const currentPage = 1;
    this.currentPage.set(currentPage);
    this.pageChange.emit(currentPage);
    this.windowResize.emit(this.window.innerWidth);
    this.resetInterval();
  }
}
