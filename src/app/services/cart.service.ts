import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

export interface CartItem {
  productId: string | undefined;
  variantId: string;
  name: string | undefined;
  flavor?: string;
  pack?: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
  stock?: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private storageKey = 'cart';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private messageService: MessageService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadCart();
  }

  private saveCart() {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }
  }

  private loadCart() {
    if (this.isBrowser) {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        this.items = JSON.parse(data);
      }
    }
  }

  getCart(): CartItem[] {
    return this.items.map(i => ({ ...i }));
  }

  addToCart(item: CartItem) {
    const existing = this.items.find(i => i.variantId === item.variantId);

    const stock = existing?.stock ?? item.stock ?? Number.POSITIVE_INFINITY;
    const increment = Math.min(item.quantity, stock);

    if (existing) {
      // Update metadata and stock
      existing.name = item.name ?? existing.name;
      existing.flavor = item.flavor ?? existing.flavor;
      existing.pack = item.pack ?? existing.pack;
      existing.unitPrice = item.unitPrice ?? existing.unitPrice;
      existing.imageUrl = item.imageUrl ?? existing.imageUrl;
      existing.stock = stock;

      // Add quantity but cap at stock
      existing.quantity = Math.min(existing.quantity + increment, stock);
    } else {
      this.items.push({
        ...item,
        stock,
        quantity: Math.min(item.quantity, stock)
      });
    }
    this.messageService.add({ severity: 'success', summary: 'Dodato u korpu', detail: 'Uspešno dodato u korpu!', life: 3000 });
    this.saveCart();
  }

  updateQuantity(variantId: string, quantity: number) {
    const item = this.items.find(i => i.variantId === variantId);
    if (!item) return;

    const stock = item.stock ?? Number.POSITIVE_INFINITY;
    item.quantity = Math.max(1, Math.min(quantity, stock));

    this.saveCart();
  }

  removeFromCart(variantId: string) {
    this.items = this.items.filter(i => i.variantId !== variantId);
    this.messageService.add({ severity: 'warn', summary: 'Uklonjeno iz korpe', detail: 'Uspešno uklonjeno iz korpe!', life: 3000 });
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }
}
