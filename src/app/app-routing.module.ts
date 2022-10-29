import { AuthGuard } from './modules/shared/services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'auth',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/auth/auth.module')
          .then(m => m.AuthModule)
      },
      {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/layout/layout.module')
          .then(m => m.LayoutModule)
      },
      {
        path: 'error',
        loadChildren: () => import('./modules/error/error.module')
          .then(m => m.ErrorModule)
      },
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'error' }
    ]
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        useHash: true,
        scrollPositionRestoration: 'top'
      }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
