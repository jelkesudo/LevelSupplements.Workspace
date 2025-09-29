import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isSideMenuOpen = false;
  showSearchBar = false;
  isLoggedIn$: Observable<boolean>;
  firstName: string | null = "";
  menuOpen = false;
  popupTop = '0px';
  popupLeft = '0px';

  @Output() cartOpened = new EventEmitter<void>();

  menuItems = [
    { label: 'Profil', action: () => this.goToProfile() },
    { label: 'Odjava', action: () => this.logout() }
  ];

  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn$ = this.auth.isLoggedIn$Obs();

    const token = this.auth.getToken();
    if (token) {
      this.firstName = this.auth.firstName;
    }
  }

  toggleCart() {
    this.cartOpened.emit();
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  toggleSearchBar(event: MouseEvent) {
    event.stopPropagation();
    this.showSearchBar = !this.showSearchBar;
  }

  toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  closeSideMenu(): void {
    this.isSideMenuOpen = false;
  }

  toggleMenu(event: MouseEvent) {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      this.popupTop = rect.bottom + 'px';
      this.popupLeft = rect.left + 'px';
    }
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
