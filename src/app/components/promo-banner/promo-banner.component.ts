import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-promo-banner',
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss'
})
export class PromoBannerComponent {
  @Input() imageSrc: string = '';
  @Input() heading: string = '';
  @Input() subheading?: string;
  @Input() description: string = '';
  @Input() buttonText?: string;
  @Input() buttonLink?: string;
  @Input() reverseOrder: boolean = false;
}
