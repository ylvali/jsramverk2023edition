import { Injectable } from '@angular/core';

import { ApiCallService } from './api-call.service';

import { User } from './User';

import { Router } from '@angular/router';



/* 
The login will call the API and log in a user.
This logs on the user on the client save, and saves it as userOn.
It also logs in the user in the database via API. 
Several users can be logged into the database. 
Only one at a time logged into the client.

This service provides a boolean if a user is logged on (and user email on request).
Thus can be injected as a service to other components.
And then, check if a user is logged on or not before doing some action.
*/

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userLoggedOn = false;
  private userOn = {};

  response = '';

  users : User[] = [];

  constructor( 
    private ApiCallService: ApiCallService,
    private router: Router) { }

    // Get user on
    getUserOn() {
      if (this.userLoggedOn) {
        return this.users;
      }
      return false;
    }

    // Get all users
    getUsers() {
        return this.users;
    }

    // Log out user
    logOut() {
      this.userLoggedOn = false;
      this.response = 'Logged out';
      this.logoutApi();
    }

    // Callback 
    // Login
    callback1(thisObj, res, result) {
      console.log(result);
      console.log(res);
      // thisObj.response = result.data.msg;

      if (result.data != undefined) {
        if (result.data.msg != undefined) {
          thisObj.userLoggedOn = true;
          thisObj.response = 'User logged on';
          thisObj.userLoggedOn = true;
          thisObj.users = {name:'loggedOn'};

          console.log(thisObj.users)

          thisObj.router.navigate(['reportApi']);
        }
      }

      if (result.error != undefined) {
          // thisObj.userLoggedOn = false;
          thisObj.response = result.error;
          thisObj.userOn = {};
          thisObj.users = {name:'error'};

          console.log(thisObj.users)
      }
    }

    // Logout
    callback2(thisObj, res, result) {
      console.log(result);
      console.log(res);
      // thisObj.response = result.data.msg;

      if (result.data != undefined) {
        if (result.data.msg != undefined) {
          thisObj.userLoggedOn = false;
          thisObj.response = 'User logged off';
          thisObj.users = {};
        }
      }

      if (result.error != undefined) {
          // thisObj.userLoggedOn = false;
          thisObj.response = result.error;
          thisObj.userOn = {};
          thisObj.users = {name:'error'};

          console.log(thisObj.users)
      }
    }


    // Login
    login(email, password) {
      var url = 'https://me-api.ysojs.se/users/login';
      var params;
      var token = null;
      var obj1 = this;
      params = {"email":email, "password":password};
      this.response = '';

      this.ApiCallService.fetchCall(params ,url, 'POST', this.callback1, token, obj1);
      this.userOn = {"email":email}
    }

    logoutApi() {
      var url = 'https://me-api.ysojs.se/users/logout';
      var params;
      var token = null;
      var obj1 = this;
      this.response = '';

      this.ApiCallService.fetchCall(params ,url, 'POST', this.callback2, token, obj1);
      this.userOn = {}
    }
}
