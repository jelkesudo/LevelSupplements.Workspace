import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrls: ['./cart-widget.component.scss']
})
export class CartWidgetComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  get items(): CartItem[] {
    return this.cartService.getCart();
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item.variantId, quantity);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.variantId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  onClose() {
    this.close.emit(); // notify parent
  }
}
