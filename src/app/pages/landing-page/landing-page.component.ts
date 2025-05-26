import { Component } from '@angular/core';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  images = [
    { src: 'images/High_Kick_start.png' },
    { src: 'images/PREVLAKE_6.webp' },
    { src: 'images/proteinbanner.png' },
  ];
}
