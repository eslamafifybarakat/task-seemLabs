import { HttpClient } from '@angular/common/http';
import { keys } from '../../shared/TS Files/localstorage-key';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from '../../shared/TS Files/auth-user';
import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  // apiUrl = environment.apiUrl;

  isUserLogin = new BehaviorSubject<boolean>(false);
  isLogged = new BehaviorSubject<boolean>(false);
  isLoggedSocial = new BehaviorSubject<boolean>(false);

  seemLabsLogged;
  data: any = userInfo;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    if (window.localStorage.getItem(keys.logged)) {
      this.seemLabsLogged = window.localStorage.getItem(keys.logged);
    } else {
      this.seemLabsLogged = false;
    }
  }

  login(email: any, password: any): any {
    this.isUserLogin.next(true);
    if (this.data.email == email && this.data.password == password) {
      this.seemLabsLogged = true;
      window.localStorage.setItem(keys.logged, 'true');
      window.localStorage.setItem(keys.userData, JSON.stringify(this.data));
      this.isLogged.next(true);
      return {
        status: true,
        data: this.data
      };
    }
    return {
      status: false
    };

  }

  isLoggedIn(): boolean {
    return window.localStorage.getItem(keys?.userData) ? true : false;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  signOut(): void {
    setTimeout(() => {
      window.localStorage.removeItem(keys.logged);
      window.localStorage.removeItem(keys.userData);
      this.isUserLogin.next(false);
      this.isLogged.next(false);
      this.isLoggedSocial.subscribe((res: any) => {
        if (res) {
          this.socialAuthService.signOut();
          this.isLoggedSocial.next(false);
        }
      });
      this.router.navigate(['/auth']);
    }, 1000);
  }

}

