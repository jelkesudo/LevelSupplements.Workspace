import { Component } from '@angular/core';
import { PromoBannerComponent } from '../../components/promo-banner/promo-banner.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  carouselImages = [
    { src: 'images/High_Kick_start.png', alt: 'Image 1' },
    { src: 'images/PREVLAKE_6.webp', alt: 'Image 1' },
    { src: 'images/proteinbanner.png', alt: 'Image 1' },
  ];
 products = Array.from({ length: 7 }).map((_, i) => ({
    id: `${i + 1}`,
    name: `Product ${i + 1}`,
    image: `images/carusel/${(i + 1) * 2}.png`,
    rating: 3,
    price: 2000,
  }));
  items = [
  { id: 1, title: 'Item 1', description: 'This is the first item', color: '#FF5733', rating: 4, price: '2.200 RSD' },
  { id: 2, title: 'Item 2', description: 'Second item description', color: '#33FF57', rating: 3, price: '1.500 RSD' },
  { id: 3, title: 'Item 3', description: 'Third item description', color: '#3357FF', rating: 5, price: '3.000 RSD' },
  { id: 4, title: 'Item 4', description: 'Fourth item description', color: '#F333FF', rating: 2, price: '1.200 RSD' },
  { id: 5, title: 'Item 5', description: 'Fifth item description', color: '#33FFF3', rating: 1, price: '999 RSD' },
  { id: 6, title: 'Item 6', description: 'Sixth item description', color: '#F3FF33', rating: 5, price: '4.500 RSD' },
];
itemsFill = [
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
    { src: 'images/recept.png', alt: "slika" },
  ];
}
