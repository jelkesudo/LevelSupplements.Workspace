import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
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
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NavbarComponent,
    CommonModule,
    ButtonModule,
    CarouselModule,
    CardModule,
    RatingModule,
  ],
  providers: [
    //provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
