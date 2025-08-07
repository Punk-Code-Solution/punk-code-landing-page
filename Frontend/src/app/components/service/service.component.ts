import { Component, ElementRef, Inject, PLATFORM_ID, HostListener, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'service',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {

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

