import { Injectable } from '@angular/core';

import { ApiCallService } from './api-call.service';


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

  constructor( 
    private ApiCallService: ApiCallService) { }

    // Get user on
    getUserOn() {
      if (this.userLoggedOn) {
        return this.userOn;
      }
      return false;
    }

    // Call the api
    callAPi(method, url, callback, dataObj = null, token=null) {
      var obj1 = this;
      if (!dataObj) {
        dataObj = {};
      }
      this.ApiCallService.fetchCall(dataObj , url, method, callback, token, obj1);
    }

    // Callback 
    callback(thisObj, res, result) {
      console.log(result);
      // thisObj.response = result.data.msg;

      if (result.data != undefined) {
        if (result.data.msg != undefined) {
          thisObj.userLoggedOn = true;
          thisObj.response = result.data.msg;
          this.userLoggedOn = true;
        }
      }

      if (result.error != undefined) {
          // thisObj.userLoggedOn = false;
          thisObj.response = result.error;
          this.userOn = {};
      }
    }

    // Login
    login(email, password) {
      var url = 'https://me-api.ysojs.se/users/login';
      var params;
      params = {"email":email, "password":password};
      this.callAPi('POST', url, this.callback, params);
      this.userOn = {"email":email}
    }

}
