import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-fade-carousel',
  templateUrl: './fade-carousel.component.html',
  styleUrl: './fade-carousel.component.scss'
})
export class FadeCarouselComponent implements OnInit, OnDestroy {
   @Input() images: any[] = [];
  @Input() interval = 3000;

  currentIndex = 0;
  timerId?: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      clearInterval(this.timerId);
    }
  }

  startAutoSlide() {
    this.timerId = setInterval(() => {
      this.next();
    }, this.interval);
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  selectSlide(index: number) {
    this.currentIndex = index;
    this.resetTimer();
  }

  resetTimer() {
    clearInterval(this.timerId);
    this.startAutoSlide();
  }
}
