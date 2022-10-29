import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/home-page/product-details/product-details.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomePageComponent,
    ProductDetailsComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
