import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ContactsPageComponent } from './pages/contacts-page/contacts-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'prodavnica', component: ShopPageComponent },
  { path: 'kontakt', component: ContactsPageComponent },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
