import { Component, EventEmitter, Output } from '@angular/core';
import { formatPrice } from '../../shared/helper';
import { Client, FlavorDto, PackDto, ProductReadDto, ProductVariantDto } from '../../services/services';
import { ActivatedRoute } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service'; // ✅ import your service

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
  product!: ProductReadDto;
  PORTION_SIZE_GRAMS = 30;

  images: ImageItem[] = [];
  selectedImage: string = '';
  responsiveOptions: any[] | undefined;
  rating: number = 0;

  variants: ProductVariantDto[] = [];
  flavors: FlavorDto[] = [];
  packsForFlavor: PackDto[] = [];

  selectedFlavorId?: string;
  selectedPackId?: string;
  selectedVariant?: ProductVariantDto;

  quantity = 1;

  @Output() cartOpened = new EventEmitter<void>();

  accordionData = [
    { title: 'Opis proizvoda', description: 'Detaljan opis proizvoda…' },
    { title: 'Sastav', description: 'Sastojci: voda, šećer, limun...' },
    { title: 'Upotreba', description: 'Preporučena upotreba: 2 puta dnevno...' }
  ];

  constructor(
    private client: Client,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.client.products2(id).subscribe({
        next: (res) => {
          this.product = res;
          this.mapProductData(res);
        },
        error: (err) => console.error('Error loading product', err)
      });
    }

    this.responsiveOptions = [
      { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
      { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
      { breakpoint: '767px', numVisible: 2, numScroll: 1 },
      { breakpoint: '575px', numVisible: 2, numScroll: 1 }
    ];
  }

  private mapProductData(product: ProductReadDto) {
    this.variants = product.variants ?? [];

    // Distinct flavors
    const flavorMap = new Map<string, FlavorDto>();
    this.variants.forEach(v => {
      if (v.flavor?.id) {
        flavorMap.set(v.flavor.id, v.flavor);
      }
    });
    this.flavors = Array.from(flavorMap.values());

    // Default: first flavor with stock
    const firstAvailableFlavor = this.flavors.find(f =>
      this.variants.some(v => v.flavor?.id === f.id && (v.quantityInStock || 0) > 0)
    );
    if (firstAvailableFlavor) {
      this.onSelectFlavor(firstAvailableFlavor.id!);
    }

    // TODO: Replace with real image URLs when backend serves them
    this.images = [
      { src: '/images/carusel/2.png', alt: 'Main image' },
      { src: '/images/carusel/4.png', alt: 'Second image' }
    ];
    this.selectedImage = this.images[0].src;
  }

  onSelectFlavor(flavorId: string) {
    if (this.isFlavorDisabled(flavorId)) return;

    this.selectedFlavorId = flavorId;

    const packs = this.variants.filter(v => v.flavor?.id === flavorId);
    const packsMap = new Map<string, PackDto>();
    packs.forEach(v => {
      if (v.pack?.id) packsMap.set(v.pack.id, v.pack);
    });
    this.packsForFlavor = Array.from(packsMap.values());

    this.selectedPackId = undefined;
    this.selectedVariant = undefined;
  }

  onSelectPack(packId: string) {
    if (this.isPackDisabled(packId)) return;

    this.selectedPackId = packId;
    this.selectedVariant = this.variants.find(
      v => v.flavor?.id === this.selectedFlavorId && v.pack?.id === packId
    );
    this.quantity = 1;
  }

  onQuantityChange() {
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > (this.selectedVariant?.quantityInStock ?? 1)) {
      this.quantity = this.selectedVariant?.quantityInStock ?? 1;
    }
  }

  increment() {
    if (this.quantity < (this.selectedVariant?.quantityInStock ?? 1)) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (!this.selectedVariant) return;

    const unitPrice = this.selectedVariant.prices?.[0]?.price ?? 0;

    const cartItem = {
      productId: this.product.id,
      variantId: this.selectedVariant.id!,
      name: this.product.name,
      flavor: this.selectedVariant.flavor?.name,
      pack: `${this.selectedVariant.pack?.size}${this.selectedVariant.pack?.unit}`,
      unitPrice,
      quantity: this.quantity,
      imageUrl: this.images[0]?.src,
      stock: this.selectedVariant.quantityInStock ?? 0 
    };

    this.cartService.addToCart(cartItem);

    this.cartOpened.emit();
  }

  selectImage(img: ImageItem) {
    this.selectedImage = img.src;
  }

  get formattedPrice(): string {
    const price = this.selectedVariant?.prices?.[0]?.price ?? 0;
    return formatPrice(price);
  }

  getPortions(pack: PackDto): string {
    const grams = pack.size ?? 0;
    if (!grams) return '0 porcija';
    const portions = Math.floor(grams / this.PORTION_SIZE_GRAMS);
    return `${portions} porcija`;
  }

  get isAddToCartDisabled(): boolean {
    if (!this.selectedVariant) return true;
    return (this.selectedVariant.quantityInStock ?? 0) < this.quantity;
  }

  isFlavorDisabled(flavorId: string): boolean {
    return !this.variants.some(
      v => v.flavor?.id === flavorId && (v.quantityInStock || 0) > 0
    );
  }

  isPackDisabled(packId: string): boolean {
    return !this.variants.some(
      v =>
        v.flavor?.id === this.selectedFlavorId &&
        v.pack?.id === packId &&
        (v.quantityInStock || 0) > 0
    );
  }
}
