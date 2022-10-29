import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AuthComponent,
    LogInComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxIntlTelInputModule,
  ]

})
export class AuthModule { }
