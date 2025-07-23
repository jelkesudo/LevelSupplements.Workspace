import { Component, Input } from '@angular/core';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() product: any;

  formatPrice(price: number): string {
    return price.toLocaleString('sr-RS') + ' DIN';
  }
}
