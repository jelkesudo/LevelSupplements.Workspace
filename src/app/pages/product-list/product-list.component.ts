import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  constructor(private router:Router){}
  products = [
    {
      name: 'IHS SUPREME WHEY PROTEIN',
      weight: '2000G',
      flavor: 'Kinder Surprise',
      price: 2200,
      imageUrl: '/images/carusel/2.png',
      rating: 4
    },
    {
      name: 'IHS SUPREME WHEY PROTEIN',
      weight: '2000G',
      flavor: 'Bela čokolada i jagoda',
      price: 2200,
      imageUrl: '/images/carusel/2.png',
      rating: 5
    },
    {
      name: 'IHS SUPREME WHEY PROTEIN',
      weight: '2000G',
      flavor: 'Čokolada',
      price: 2200,
      imageUrl: '/images/carusel/2.png',
      rating: 4
    }
  ];

  goToProductDetails() {
    this.router.navigate(['/products', 0]);
  }
}
