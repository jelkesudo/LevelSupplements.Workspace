import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { formatPrice } from '../../shared/helper';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  constructor(private router:Router){}
  @Input() product!: {
    name: string;
    flavor: string;
    weight: string;
    price: number;
    imageUrl: string;
    rating: number;
  };

  @Output() cardClick = new EventEmitter<void>();
  goToPreset(event: Event, presetName: string) {
      event.stopPropagation();
      this.router.navigate(['/products'], { queryParams: { preset: presetName } });
  }
  onClick() {
    this.cardClick.emit();
  }
  get formattedPrice(): string {
    return formatPrice(this.product.price);
  }
}
