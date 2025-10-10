import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryEnum, Client } from '../../services/services';
import { LoaderService } from '../../services/loader.service';
import { ProductDisplay } from '../../interfaces/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  // filter dropdowns
  flavorOptions: { id: string; label: string }[] = [];
  packOptions: { id: string; label: string }[] = [];

  selectedFlavors: string[] = [];
  selectedPacks: string[] = [];
  category!: CategoryEnum;

  products: ProductDisplay[] = [];

  constructor(
    private client: Client,
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoryParam = params['category'];
      if (categoryParam) {
        const categorySave = categoryParam as keyof typeof CategoryEnum;
        this.category = CategoryEnum[categorySave];
      }
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loaderService.showLoader();

    this.client.products(undefined, "name", "ASC", this.category, 20, 1).subscribe({
      next: res => {
        const rawProducts = res.data ?? [];

        // flatten to display products
        this.products = rawProducts.flatMap(p =>
          (p.flavors ?? []).map(f => ({
            id: p.id!,
            name: p.name!,
            description: p.description,
            flavorId: f.id!,
            flavorName: f.name!,
            flavorColor: f.color,
            packs: (f.packs ?? [])
              .map(pk => ({
                id: pk.id!,
                label: `${pk.size} ${pk.unit}`
              }))
              .sort((a, b) => parseFloat(a.label) - parseFloat(b.label))
          }))
        );

        // dropdowns
        const allPacks = rawProducts.flatMap(p =>
          (p.flavors ?? []).flatMap(f => f.packs ?? [])
        );

        const allFlavors = rawProducts.flatMap(p => p.flavors ?? []);

        this.packOptions = Array.from(
          new Map(
            allPacks.map(pk => [
              pk.id,
              { id: pk.id ?? "", label: `${pk.size} ${pk.unit}` }
            ])
          ).values()
        ).sort((a, b) => parseFloat(a.label) - parseFloat(b.label));

        this.flavorOptions = Array.from(
          new Map(
            allFlavors.map(f => [
              f.id,
              { id: f.id ?? "", label: f.name ?? "" }
            ])
          ).values()
        );
      },
      error: err => console.error(err),
      complete: () => this.loaderService.hideLoader()
    });
  }

  applyFilters() {
    this.client.products(undefined, "name", "ASC", this.category, 20, 1).subscribe(res => {
      const rawProducts = res.data ?? [];

      let flattened = rawProducts.flatMap(p =>
        (p.flavors ?? []).map(f => ({
          id: p.id!,
          name: p.name!,
          description: p.description,
          flavorId: f.id!,
          flavorName: f.name!,
          flavorColor: f.color,
          packs: (f.packs ?? [])
            .map(pk => ({
              id: pk.id!,
              label: `${pk.size} ${pk.unit}`
            }))
            .sort((a, b) => parseFloat(a.label) - parseFloat(b.label))
        }))
      );

      if (this.selectedPacks.length > 0) {
        flattened = flattened.filter(p =>
          p.packs.some(pk => this.selectedPacks.includes(pk.id))
        );
      }

      if (this.selectedFlavors.length > 0) {
        flattened = flattened.filter(p =>
          this.selectedFlavors.includes(p.flavorId)
        );
      }

      this.products = flattened;
    });
  }

  goToProductDetails(id: string | undefined) {
    if (id) {
      this.router.navigate(['/products', id]);
    }
  }
}
