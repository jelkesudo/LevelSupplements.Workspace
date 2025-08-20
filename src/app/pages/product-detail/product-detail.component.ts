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
  specs = [
    { text: 'Potpuno ', bold: 'nova formula' },
    { bold: '22g proteina', text: ' po porciji od 30g' },
    { text: 'Manje od ', bold: '1g laktoze', text2: ' na 100g proizvoda' },
    { bold: '100mg DigeZym', text: ' ® enzima po porciji' },
    { bold: 'Bez glutena' },
    { text: 'Laka ', bold: 'rastovljivost' },
    { bold: 'Laboratorijski', text: ' potvrđeno' }
  ];
  selectedFlavor: string | null = null;
  selectedPackage = this.packages[0];
  quantity = 1;
  accordionData = [
    { title: 'Opis proizvoda', 
      description: `
      U vreme kada se mnogi proizvođači okreću jeftinijim sirovinama kako bi smanjili troškove, 
      <b>IHS je krenuo drugim putem</b> - prema višem levelu. 
      <br><br>
      <b>IHS Supreme Whey</b> je prošao kroz kompletnu transformaciju iz koje je stvoren 
      najčistiji i najefikasniji protein koji je IHS ikada izgradio.
      <br><br>
      Nova formula IHS Supreme Whey proteina više nije mešavina, već čist vrhunski koncentrat, 
      sa visokim % proteina, minimalnim sadržajem laktoze i besprekornom rastvorljivošću.
      <br><br>
      Zahvaljujući <b>BCAA amino kiselinama</b> prisutnim u Supreme Whey proteinu, možeš biti 
      bez brige kada je u pitanju stanje tvog mišićnog tkiva. One efikasno podržavaju regeneraciju 
      mišićnih vlakana nakon napornih i intenzivnih vežbi.
      <br><br>
      <b>Idealan za sve koji traže ozbiljne rezultate bez nepotrebnih dodataka.</b>
      <br><br>
      Ovakav kvalitet IHS je ostvario uz pažljivo birane proteine, laboratorijski testirane 
      i razvijene u saradnji sa tehnolozima i sportistima.
    `
  },
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
