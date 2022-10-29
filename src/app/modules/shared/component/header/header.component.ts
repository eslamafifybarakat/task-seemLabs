import { keys } from './../../TS Files/localstorage-key';
import { AuthUserService } from './../../../auth/services/auth-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentLanguage: any;
  logo: any = "assets/image/logo.svg";

  collapsed: boolean = false;
  isLoggedin: boolean = false;

  constructor(
    private authUserService: AuthUserService
  ) { }

  ngOnInit(): void {
    this.isLoggedin = this.authUserService.isLoggedIn();
    this.currentLanguage = window.localStorage.getItem(keys.language);
  }
}
