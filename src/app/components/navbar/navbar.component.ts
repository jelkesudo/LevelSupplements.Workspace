import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isSideMenuOpen = false;
  showSearchBar = false;
  isLoggedIn$: Observable<boolean>;
  firstName: string | null = "";
  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn$ = this.auth.isLoggedIn$Obs();

    const token = this.auth.getToken();
    if (token) {
      this.firstName = this.auth.firstName;
      console.log("ime", this.firstName);
    }
  }
  onUserClick() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user-info']);
    } else {
      this.router.navigate(['/login']);
    }
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
}
