import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../services/cart.service';
import { Client } from '../../services/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../services/loader.service';
interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}
type PaymentMethod = 'card' | 'cod';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent  implements OnInit{

  cart: CartItem[] = [];

  // order-side data
  paymentMethod: PaymentMethod = 'card';
  shippingCost = 300; // flat rate for now
  promoCode = '';
  appliedPromo: { code: string; type: 'percent' | 'fixed'; amount: number } | null = null;
  shippingForm!: FormGroup;
  // customer shipping info
  shippingInfo: ShippingInfo = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  };

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private loaderService: LoaderService,
    private client: Client
  ) {}

ngOnInit(): void {
  this.loaderService.showLoader();

  this.shippingForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)]],
  });

  const token = localStorage.getItem("auth_token");

  if (token) {

  this.client.me().subscribe({
    next: (user) => {
      console.log("Current user:", user);

      this.shippingForm.patchValue({
        fullName: user.fullName ?? '',
        email: user.email ?? '',
        address: user.addresses?.[0]?.name ?? '',
        city: user.addresses?.[0]?.number ?? '' 
      });
    },
    error: (err) => {
      console.error("Failed to fetch user profile", err);
    }
  });
} else {
  console.log("User not logged in, skipping profile fetch.");
}
  this.loaderService.hideLoader();

  this.refresh();
}

  // ---------- derived totals ----------
  get subtotal(): number {
    return this.cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  }

  get discount(): number {
    if (!this.appliedPromo) return 0;
    const base = this.subtotal;
    if (this.appliedPromo.type === 'percent') {
      return Math.max(0, +(base * (this.appliedPromo.amount / 100)).toFixed(2));
    }
    return Math.max(0, +this.appliedPromo.amount.toFixed(2));
  }

  get total(): number {
    const t = this.subtotal - this.discount + (this.cart.length ? this.shippingCost : 0);
    return Math.max(0, +t.toFixed(2));
  }

  // ---------- ui actions ----------
  refresh(): void {
    this.cart = this.cartService.getCart();
  }

  trackByVariantId = (_: number, item: CartItem) => item.variantId;

  onQtyChange(item: CartItem, value: number | string): void {
    const n = Number(value);
    if (!Number.isFinite(n) || n < 1) return;
    this.cartService.updateQuantity(item.variantId, n);
    this.refresh();
  }

  remove(variantId: string): void {
    this.cartService.removeFromCart(variantId);
    this.refresh();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.appliedPromo = null;
    this.promoCode = '';
    this.refresh();
  }

  applyPromo(): void {
    // MVP demo logic. Replace with API call later.
    const code = this.promoCode.trim().toUpperCase();

    if (!code) {
      this.appliedPromo = null;
      return;
    }

    // examples: WELCOME10 => 10% ; FIX500 => 500 RSD off
    if (code === 'WELCOME10') {
      this.appliedPromo = { code, type: 'percent', amount: 10 };
    } else if (code === 'FIX500') {
      this.appliedPromo = { code, type: 'fixed', amount: 500 };
    } else {
      this.appliedPromo = null; // invalid
    }
  }

  checkout(): void {
  if (!this.cart.length) {
    alert("Your cart is empty.");
    return;
  }

  if (!this.shippingInfo.fullName || !this.shippingInfo.email || !this.shippingInfo.address) {
    alert("Please fill in all required shipping details.");
    return;
  }

  const payload = {
    customer: this.shippingInfo,
    items: this.cart,
    promoCode: this.appliedPromo?.code ?? null,
    paymentMethod: this.paymentMethod,
    totals: {
      subtotal: this.subtotal,
      discount: this.discount,
      shipping: this.cart.length ? this.shippingCost : 0,
      total: this.total
    }
  };

  console.log('Checkout payload', payload);

  // Example backend call
  // this.client.createOrder(payload).subscribe({
  //   next: (res) => {
  //     console.log("Order success", res);
  //     this.clearCart();
  //   },
  //   error: (err) => console.error("Order failed", err)
  // });
}
}
