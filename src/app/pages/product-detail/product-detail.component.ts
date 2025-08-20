import { Component } from '@angular/core';
import { formatPrice } from '../../shared/helper';
import { MessageService } from 'primeng/api';
interface ImageItem {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent {
  images: ImageItem[] = [];
  selectedImage: string = '';
  responsiveOptions: any[] | undefined;
  rating: number = Math.round(2.5);
  packages = [
    { weight: '30g', portions: '1 PORCIJA' },
    { weight: '750g', portions: '25 PORCIJA' },
    { weight: '2000g', portions: '66 PORCIJA' }
  ];
  flavors = [
    { name: 'UKUS DETINJSTVA', color: '#d9a066' },
    { name: 'BELA ČOKOLADA I JAGODA', color: '#e74c3c' },
    { name: 'ČOKOLADA', color: '#3b2f2f' },
    { name: 'KOLAČIĆI', color: '#e67e22' },
    { name: 'SLADOLED VANILA', color: '#f3e5ab' },
    { name: 'TIRAMISU', color: '#a1887f' },
    { name: 'KOKOS', color: '#f8f8f8' },
    { name: 'KREM KOKOS I BADEM', color: '#f5b7b1' }
  ];
  selectedFlavor: string | null = null;
  selectedPackage = this.packages[0];
  quantity = 1;
  accordionData = [
    { title: 'Opis proizvoda', description: 'Ovo je detaljan opis proizvoda...' },
    { title: 'Sastav', description: 'Sastojci: voda, šećer, limun...' },
    { title: 'Upotreba', description: 'Preporučena upotreba: 2 puta dnevno...' }
  ];
  ngOnInit(): void {
    this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 2,
                numScroll: 1
            }
        ]
    this.images = [
      { src: '/images/carusel/2.png', alt: 'Image 1' },
      { src: '/images/carusel/4.png', alt: 'Image 2' },
      { src: '/images/carusel/6.png', alt: 'Image 3' },
      { src: '/images/carusel/2.png', alt: 'Image 4' },
      { src: '/images/carusel/2.png', alt: 'Image 5' },
      { src: '/images/carusel/2.png', alt: 'Image 6' },
    ];
    if (this.images.length > 0) {
      this.selectedImage = this.images[0].src;
    }
  }

  selectPackage(pkg: any) {
    this.selectedPackage = pkg;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const cartItem = {
      package: this.selectedPackage,
      quantity: this.quantity,
      flavor: this.selectedFlavor
    };
    console.log('Dodato u korpu:', cartItem);
  }
  selectImage(img: ImageItem) {
    this.selectedImage = img.src;
  }
  selectFlavor(flavor: string) {
    this.selectedFlavor = flavor;
    console.log('Izabrani ukus:', this.selectedFlavor);
  }
  get formattedPrice(): string {
      return formatPrice(2000);
  }
}
