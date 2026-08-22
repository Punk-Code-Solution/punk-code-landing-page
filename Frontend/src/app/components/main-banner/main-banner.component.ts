import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'main-banner',
  imports: [],
  templateUrl: './main-banner.component.html',
  styleUrl: './main-banner.component.css',
})
export class MainBannerComponent implements OnInit {
  ready = false;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.ready = true;
      return;
    }

    requestAnimationFrame(() => {
      this.ready = true;
    });
  }
}
