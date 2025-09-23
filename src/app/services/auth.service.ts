import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Client, AuthRequest, AuthResponse } from './services';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
export interface DecodedToken {
  firstName: string;
  email: string;
}
@Injectable({ providedIn: 'root' })

export class AuthService {
  private tokenKey = 'auth_token';
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  private user$ = new BehaviorSubject<DecodedToken | null>(null);

  private isBrowser: boolean;

  constructor(
    private client: Client,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        this.loggedIn$.next(true);
        this.user$.next(jwtDecode<DecodedToken>(token));
      }
    }
  }

  login(email: string, password: string) {
    const req = new AuthRequest({ email, password });

    return this.client.authPOST(req).pipe(
      tap((res: AuthResponse) => {
        if (this.isBrowser && res?.token) {
          localStorage.setItem(this.tokenKey, res.token);
          this.loggedIn$.next(true);
          this.user$.next(jwtDecode<DecodedToken>(res.token));
        }
      })
    );
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      this.loggedIn$.next(false);
      this.user$.next(null);
    }
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.tokenKey) : null;
  }

  isLoggedIn(): boolean {
    return this.isBrowser && this.hasToken();
  }

  isLoggedIn$Obs() {
    return this.loggedIn$.asObservable();
  }
  get firstName(): string | null {
    return this.user$.value?.firstName ?? null;
  }
  private hasToken(): boolean {
    return this.isBrowser && !!localStorage.getItem(this.tokenKey);
  }
}
