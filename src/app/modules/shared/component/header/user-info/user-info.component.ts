import { keys } from './../../../TS Files/localstorage-key';
import { Router } from '@angular/router';
import { AuthUserService } from './../../../../auth/services/auth-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userdata = JSON.parse(window.localStorage.getItem(keys.userData) || " {}");
  collapse: boolean = false;

  constructor(
    private router: Router,
    public _AuthUserser: AuthUserService
  ) {  }

  ngOnInit(): void {
  }
  signOut(): void {
    this._AuthUserser.signOut();
  }


}
