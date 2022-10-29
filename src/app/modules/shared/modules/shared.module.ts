import { RouterModule } from '@angular/router';
import { UserInfoComponent } from '../component/header/user-info/user-info.component';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AngMaterialModule } from './ang-material/ang-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from '../component/language-selector/language-selector.component';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HeaderComponent } from '../component/header/header.component';
import { ThemeComponent } from '../component/header/theme/theme.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { SearchComponent } from '../component/search/search.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgSelectModule } from '@ng-select/ng-select';

const allShared = [
  FormsModule,
  ReactiveFormsModule,
  AngMaterialModule,
  TranslateModule,
  TimeagoModule,
  FormsModule,
  SweetAlert2Module,
  NgbPaginationModule,
  NgbAlertModule,
  NgxIntlTelInputModule,
  NgbModule,
  RouterModule,
  ClickOutsideModule,
  CarouselModule,
  NgSelectModule
];

const components = [
  LanguageSelectorComponent,
  UserInfoComponent,
  HeaderComponent,
  SearchComponent,
  ThemeComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...allShared,
  ],
  providers: [],
  exports: [
    ...allShared,
    ...components
  ]
})
export class SharedModule { }
