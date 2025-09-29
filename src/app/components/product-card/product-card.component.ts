import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { formatPrice } from '../../shared/helper';
import { PackDto, ProductReadDto } from '../../services/services';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  constructor(private router: Router) {}

  @Input() product!: ProductReadDto;

  @Output() cardClick = new EventEmitter<void>();

  goToPreset(event: Event, presetName: string) {
    event.stopPropagation();
    this.router.navigate(['/products'], { queryParams: { preset: presetName } });
  }

  onClick() {
    this.cardClick.emit();
  }

  get flavorNames(): string {
    return this.product.variants
      ?.map(v => v.flavor?.name)
      .filter(name => !!name)
      .join(', ') ?? '';
  }

  get packSizes(): string {
    return this.product.variants
      ?.map(v => `${v.pack?.size} ${v.pack?.unit}`)
      .filter(label => !!label)
      .join(', ') ?? '';
  }
}
