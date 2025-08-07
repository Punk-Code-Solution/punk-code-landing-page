import { Component, HostListener, ElementRef, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'solution',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements OnInit {

  isAnimated = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  checkScroll() {
    // Check if we're in a browser environment
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.scrollY + window.innerHeight;

    if (scrollPosition > componentPosition) {
      this.isAnimated = true;
    }

  }

}
