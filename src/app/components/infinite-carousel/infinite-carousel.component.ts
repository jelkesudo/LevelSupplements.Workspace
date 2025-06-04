import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infinite-carousel',
  templateUrl: './infinite-carousel.component.html',
  styleUrl: './infinite-carousel.component.scss'
})
export class InfiniteCarouselComponent {
  images = [
    { src: 'images/whey-protein.png', alt: 'Image 1', caption: 'Heading 1' },
    { src: 'images/whey-protein.png', alt: 'Image 2', caption: 'Heading 2' },
    { src: 'images/whey-protein.png', alt: 'Image 3', caption: 'Heading 3' },
    { src: 'images/whey-protein.png', alt: 'Image 4', caption: 'Heading 4' },
    { src: 'images/whey-protein.png', alt: 'Image 5', caption: 'Heading 5' }
  ];

  visibleItems :any[] = [...this.images, ...this.images, ...this.images];
}