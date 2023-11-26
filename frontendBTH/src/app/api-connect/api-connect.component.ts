import { Component } from '@angular/core';

import { ApiCallService } from '../api-call.service';

import { User } from '../User';




@Component({
  selector: 'app-api-connect',
  templateUrl: './api-connect.component.html',
  styleUrls: ['./api-connect.component.css']
})
export class ApiConnectComponent {
  
  constructor( 
    private ApiCallService: ApiCallService) { }

    // ------------------------------- Properties
    response = '';
    response2 = '';

    users : User[] = [];

    weekNr = '';
    title = '';
    text = '';
    token = '';
    value1_feedback = '';
    value2_feedback = '';
    value3_feedback = '';
    value4_feedback = '';

    // REPORTS Get week
    week(weekNr) {
      if(!Number(weekNr)) {
        this.value1_feedback = 'Not a number';
        return false;
      }
      this.weekNr = weekNr;
      console.log('Week nr set: '+weekNr)
      return true;
    }

    // SET VALUES
    setText(text1) {
      if(!String(text1)) {
        this.value2_feedback = 'Not a text';
        return false;
      }
      this.text = text1;
      console.log('Text collected: '+text1)
      return true;
    }

    setTitle(title1) {
      if(!String(title1)) {
        this.value3_feedback = 'Not a text';
        return false;
      }
      this.title = title1;
      console.log('Title collected: '+title1)
      return true;
    }

    setToken(token) {
      if(!String(token)) {
        this.value4_feedback = 'Not a text';
        return false;
      }
      this.token = token;
      console.log('Token collected: '+token)
      return true;
    }


    // FORM REQUESTS WITH CONTROL
    // These form request use control
    theForm1(weekNr) {
      this.route4(weekNr);
      this.value1_feedback = 'Data request';
    }

    theForm2(title, text, token) {
      console.log('header: '+token);

      this.route5(title, text, token);
      this.value1_feedback = 'Data request';
    }

    // Call the api routes
    callAPi2(method, url, callback, dataObj = null, token=null) {
      var obj1 = this;
      if (!dataObj) {
        dataObj = {};
      }
      this.ApiCallService.fetchCall(dataObj ,url, method, callback, token, obj1);
    }

    // Call the api routes
    callAPi1(method, url, callback, params = null, header = null) {
      var obj1 = this;
      this.ApiCallService.reqCall(method, url, callback, obj1, params, header);
    }

    // THE CALLBACKS
    callback1(thisObj, res, result) {
      console.log(res);

      console.log(result);

      console.log(result.data);

      console.log(result.data.pres2)

      thisObj.response = result.data.pres2;
    }

    callback2(thisObj,res, result) {
      console.log(res);
      console.log(result);

      thisObj.response = result.data.token;
    }

    // All users / all logged on
    callback3(thisObj, res, result) {
      console.log(result.data);
      thisObj.users = result.data.data;

      console.log(result.data.data[0].name)
      thisObj.response = 'Success';
    }

    callback4(thisObj, res, result) {
      console.log(result.data.data[0].data);
      thisObj.response2 = result.data.data[0].data;
    }

    callback5(thisObj, res, result) {
      console.log(result);
      thisObj.response = 'Success';
    }

    callback6(thisObj, res, result) {
      console.log(result);
      thisObj.response = 'Success';
    }

    callback7(thisObj, res, result) {
      console.log(result);
      thisObj.response = 'Success';
    }

    callback8(thisObj, res, result) {
      console.log(result);
      thisObj.response = 'Success';
    }

    // Using the observable class for users
    // getUsers():Observable<User[]> {
    //   const users1 = of(this.users);
    //   return users1;
    // }

    // returnUsers2(): void {
    //   this.getUsers().subscribe(users=>this.users=users);
    // }

    // returnUsers(): void {
    //   this.ApiCallService.getUsers().subscribe(users=>this.users=users);
    // }

    // Main route
    // This route calls the API server with the first callback. 
    // The callback is modified for the data.
    route1() {
      this.callAPi2('GET', 'https://me-api.ysojs.se', this.callback1);
    }

    // Token
    route2() {
      this.callAPi2('GET', 'https://me-api.ysojs.se/token', this.callback2);
    }

    route3() {
      this.callAPi2('POST', 'https://me-api.ysojs.se/users/allUsers', this.callback3);
    }

    route4(weekNr = 1) {
      var url = 'https://me-api.ysojs.se/reports/week/' + weekNr;
      this.callAPi2('GET', url, this.callback4);
    }

    // Register a text
    route5(title, text, token) {
      var url = 'https://me-api.ysojs.se/reports/add';
      var params;

      params = {"title":title, "data1":text};
      this.callAPi2('POST', url, this.callback5, params, token);
    }

    // register a user
    route6(email, password, name=null, birthday=null) {
      var url = 'https://me-api.ysojs.se/users/register';
      var params;
      params = {"email":email, "password":password, "name":name, "birthday":birthday};
      this.callAPi2('POST', url, this.callback6, params);
    }

    // login user
    route7(email, password) {
      var url = 'https://me-api.ysojs.se/users/login';
      var params;
      params = {"email":email, "password":password};
      this.callAPi2('POST', url, this.callback7, params);
    }

    // allLoggedOn
    route8() {
      var url = 'https://me-api.ysojs.se/users/allLoggedOn';
      var params;
      params = {};
      this.callAPi2('POST', url, this.callback3, params);
    }

}
