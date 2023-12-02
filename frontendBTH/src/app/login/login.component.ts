import { Component } from '@angular/core';

import { ApiCallService } from '../api-call.service';

import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor( 
    private ApiCallService: ApiCallService,
    private LoginService: LoginService,) { }

    response = '';

    getResponse() {
      this.response = this.LoginService.response;
    }

    logOut() {
      this.LoginService.logOut();
      this.response = 'logged out';
    }

    login(email, password) {
      this.LoginService.login(email, password);
      this.getResponse();
    }
}
