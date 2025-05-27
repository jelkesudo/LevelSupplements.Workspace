import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, ElementRef, Input, QueryList, Renderer2, PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements AfterContentInit {
  @Input() visibleItems = 4;

  @ContentChildren('carouselItem', { read: ElementRef }) items!: QueryList<ElementRef>;



  currentIndex = 0;
  totalItems = 0;
  clonesCount = 0;
  animating = false;

  get itemWidthPercent(): number {
    if (isPlatformBrowser(this.platformId)) {
        const width = window.innerWidth;
        if (width < 768) return 100;     // phone
        else if (width < 1024) return 30; // tablet
        else return 22;                  // desktop
      }

      // fallback for server-side rendering
      return 22;
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private renderer: Renderer2) {}

  ngAfterContentInit() {
    this.totalItems = this.items.length;
    this.clonesCount = this.visibleItems; // number of clones to add for looping

    this.setWidths();
  }

  ngAfterViewInit() {

    if (!this.items || this.items.length === 0 || !this.items.first) {
      return;
    }
    const track = this.items.first.nativeElement.parentElement;
    if (!track) return;

    Array.from(track.querySelectorAll('.clone')).forEach((c:any) => c.remove());

    for (let i = 0; i < this.clonesCount; i++) {
      const cloneNode = this.items.toArray()[i].nativeElement.cloneNode(true);
      this.renderer.addClass(cloneNode, 'clone');
      this.renderer.appendChild(track, cloneNode);
    }
  }

  setWidths() {
    this.items.forEach(item => {
      this.renderer.setStyle(item.nativeElement, 'flex', `0 0 ${this.itemWidthPercent}%`);
      this.renderer.setStyle(item.nativeElement, 'margin-right', '2%');
    });
  }

  next() {
    if (this.animating) return;
    this.animating = true;

    this.currentIndex++;

    this.animateSlide();

    if (this.currentIndex === this.totalItems) {
      setTimeout(() => {
        this.animating = false;
        this.currentIndex = 0;
        this.disableAnimation();
      }, 300);
    } else {
      setTimeout(() => this.animating = false, 300);
    }
  }

  prev() {
    if (this.animating) return;
    this.animating = true;

    if (this.currentIndex === 0) {
      this.disableAnimation();
      this.currentIndex = this.totalItems;
      setTimeout(() => {
        this.enableAnimation();
        this.currentIndex--;
        this.animateSlide();
        setTimeout(() => this.animating = false, 300);
      }, 50);
    } else {
      this.currentIndex--;
      this.animateSlide();
      setTimeout(() => this.animating = false, 300);
    }
  }

  animateSlide() {
    this.enableAnimation();
  }

  enableAnimation() {
    const track = this.items.first.nativeElement.parentElement;
    if (track) {
      this.renderer.setStyle(track, 'transition', 'transform 0.3s ease');
    }
  }

  disableAnimation() {
    const track = this.items.first.nativeElement.parentElement;
    if (track) {
      this.renderer.setStyle(track, 'transition', 'none');
    }
  }

  get translateXPercent(): number {
    const step = this.itemWidthPercent + 2;
    return this.currentIndex * step;
  }
}
