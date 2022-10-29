import { AuthUserService } from './../../../auth/services/auth-user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  url: string = '';

  constructor(
    public authService: AuthUserService,
    public router: Router
  ) { }

  checkLogin(): boolean {
    if (
      this.url.includes('/auth/login') ||
      this.url.includes('/auth/forget-password') ||
      this.url.includes('/auth/register') ||
      this.url.includes('/auth/new-password')
    ) {
      return true;
    }
    return false;
  }
  authState(): boolean {
    if (this.checkLogin()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  notAuthState(): boolean {
    if (this.checkLogin()) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.url = state?.url;
    if (this.authService?.isLoggedIn()) {
      return this.authState();
    }
    return this.notAuthState();
  }

}
