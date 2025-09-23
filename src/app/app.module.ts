import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { PromoBannerComponent } from './components/promo-banner/promo-banner.component';
import { FadeCarouselComponent } from './components/fade-carousel/fade-carousel.component';
import { CardComponent } from './components/card/card.component';
import { InfiniteCarouselComponent } from './components/infinite-carousel/infinite-carousel.component';
import { BannerWithPictureComponent } from './components/banner-with-picture/banner-with-picture.component';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { CustomCarouselComponent } from './components/custom-carousel/custom-carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { ToastModule } from 'primeng/toast';
import { CustomInfiniteCarouselComponent } from './components/custom-infinite-carousel/custom-infinite-carousel.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { Client, API_BASE_URL } from '../app/services/services';
import { provideHttpClient, withFetch } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ContactsPageComponent,
    FooterComponent,
    ShopPageComponent,
    PromoBannerComponent,
    LandingPageComponent,
    FadeCarouselComponent,
    CardComponent,
    InfiniteCarouselComponent,
    BannerWithPictureComponent,
    CustomCarouselComponent,
    CustomInfiniteCarouselComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    CustomAccordionComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NavbarComponent,
    CommonModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    RatingModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    Client,
    { provide: API_BASE_URL, useValue: 'http://localhost:5232' },
      providePrimeNG({
      theme: {
        preset: 'lara',
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
