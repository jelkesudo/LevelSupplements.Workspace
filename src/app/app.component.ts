import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'LevelSupplements.Workspace';
  isCartOpen = false;

  openCart() {
    this.isCartOpen = true;
  }
  hideHeaderFooter(): boolean {
    const noLayoutRoutes = ['/login', '/register'];
    return noLayoutRoutes.includes(this.router.url);
  }
}
