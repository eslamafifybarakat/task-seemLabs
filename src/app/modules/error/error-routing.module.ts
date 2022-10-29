import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { Error500Component } from './components/error500/error500.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '', component: ErrorComponent,
    title: 'error',
    children: [
      {
        path: '404',
        component: Error404Component,
        title: 'error404'
      },
      {
        path: '500',
        component: Error500Component,
        title: 'error500'
      },
      {
        path: '',
        redirectTo: '404',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'error/404' },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
