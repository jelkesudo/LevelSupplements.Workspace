import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client, ProductListDto, ProductReadDto } from '../../services/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products: ProductListDto[] = [];

  // filter dropdowns
  flavorOptions: { id: string; label: string }[] = [];
  packOptions: { id: string; label: string }[] = [];

  selectedFlavors: string[] = [];
  selectedPacks: string[] = [];

  constructor(private client: Client, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.client.products(undefined, "name", "ASC", 20, 1).subscribe(res => {
      this.products = res.data ?? [];

      // collect pack + flavor options
      const allPacks = this.products.flatMap(p => p.packs ?? []);
      const allFlavors = this.products.flatMap(p => p.flavors ?? []);

      this.packOptions = Array.from(
        new Map(
          allPacks.map(p => [
            p.id,
            { id: p.id ?? "", label: `${p.size} ${p.unit}` }
          ])
        ).values()
      );

      this.flavorOptions = Array.from(
        new Map(
          allFlavors.map(f => [
            f.id,
            { id: f.id ?? "", label: f.name ?? "" }
          ])
        ).values()
      );
    });
  }

  applyFilters() {
    this.client.products(undefined, "name", "ASC", 20, 1).subscribe(res => {
      let filtered = res.data ?? [];

      if (this.selectedPacks.length > 0) {
        filtered = filtered.filter(p =>
          p.packs?.some(pk => this.selectedPacks.includes(pk.id!))
        );
      }

      if (this.selectedFlavors.length > 0) {
        filtered = filtered.filter(p =>
          p.flavors?.some(f => this.selectedFlavors.includes(f.id!))
        );
      }

      this.products = filtered;
    });
  }

  goToProductDetails(id: string | undefined) {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }
}
