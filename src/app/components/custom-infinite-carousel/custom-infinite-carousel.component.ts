import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-infinite-carousel',
  templateUrl: './custom-infinite-carousel.component.html',
  styleUrl: './custom-infinite-carousel.component.scss'
})
export class CustomInfiniteCarouselComponent{
  @Input() itemsFill: any[] = [];
  @Input() widthImg!: number;
  @Input() caption: boolean = true;

  get items(): any[] {
    return this.itemsFill ? Array(10).fill(this.itemsFill).flat() : [];
  }
}
