import { keys } from './../../../shared/TS Files/localstorage-key';
import { TranslationService } from './../../../shared/services/i18n/translation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CountryISO, SearchCountryField } from 'ngx-intl-tel-input';
import { userInfo } from '../../../shared/TS Files/auth-user';
import { AuthUserService } from '../../services/auth-user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  showeye: boolean = false;
  currentLanguage: any;

  loginData: any;

  isLoggedin?: boolean;
  userData: any = userInfo;
  isloadingBtn: boolean = false;
  vectorLogin: any = "assets/image/vector-login.svg";
  logo: any = "assets/image/Logo-login.svg";


  constructor(
    private fb: FormBuilder,
    public tanslationService: TranslationService,
    private location: Location,
    public _AuthUser: AuthUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(keys.language);
    this.loginform.patchValue(
      {
        phone: userInfo.phone,
        email: userInfo.email,
        password: userInfo.password
      }
    );
  }

  loginform = this.fb.group({
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20)]]
  });
  get formControls(): any {
    return this.loginform?.controls;
  }

  togglePassword(): void {
    this.showeye = !this.showeye;
  }
  back(): void {
    this.location.back();
  }

  submit(): void {
    this.loginData = this._AuthUser?.login(this.loginform?.value?.email, this.loginform?.value?.password);
    if (this.loginData['status'] == true) {
      this.isloadingBtn = true;
      window.localStorage.setItem("isauth", "true");
      this.router.navigate(
        ['/']
      );
    }
    else {
      alert(this.loginData['message']);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

