import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { formatPrice } from '../../shared/helper';
import { PackDto, ProductReadDto } from '../../services/services';
import { ProductDisplay } from '../../interfaces/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

   constructor(private router: Router) {}

  @Input() product!: ProductDisplay;

  @Output() cardClick = new EventEmitter<void>();

  goToPreset(event: Event, presetName: string) {
    event.stopPropagation();
    this.router.navigate(['/products'], { queryParams: { preset: presetName } });
  }

  onClick() {
    this.cardClick.emit();
  }

  get flavorNames(): string {
    return this.product.flavorName; // 👈 one flavor per card
  }

  get packSizes(): string {
    return this.product.packs.join(', ');
  }

  get packLabels(): string {
    return this.product?.packs
      ?.map(pk => pk.label)
      .join(', ') ?? '';
  }
}
