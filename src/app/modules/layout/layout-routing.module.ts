import { ProductDetailsComponent } from './../pages/components/home-page/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/pages.module')
          .then(m => m.PagesModule)
      }
    ]
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
    data: {
      title: 'titles.details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
