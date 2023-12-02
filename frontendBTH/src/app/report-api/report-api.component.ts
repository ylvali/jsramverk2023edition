import { Component } from '@angular/core';

import { ApiCallService } from '../api-call.service';

import { LoginService } from '../login.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-report-api',
  templateUrl: './report-api.component.html',
  styleUrls: ['./report-api.component.css']
})
export class ReportAPIComponent {

  userOn = false;
  response1 = '';
  response2 = '';
  title = '';
  reportData = '';
  token = '';

  constructor( 
    private ApiCallService: ApiCallService,
    private LoginService: LoginService,
    private router: Router
    ) { }

    // Check if a user is online
    // Get token
    ngOnInit(): void {
      this.userOnline();
      this.route4(); 
    }

    // If no user online transfer to login
    userOnline(){
      console.log('Checking if the user is online');
      var testU;
      testU = this.LoginService.getUserOn();

      if (testU) {
        this.userOn = true;
        this.response1 = 'Access by user';
        return;
      }

      this.response1 = 'No-Access, no user';
      this.router.navigate(['login']);
      console.log('User online:'+this.userOn);
    }

    // CALLBACKS
    // Get response data
    callback(thisObj, res, result) {
      console.log(result);
      thisObj.reponse2 = result.data.msg;

      if(result.data.data[0] == undefined) { 
          console.log("No data");
          thisObj.title = 'No data';
          thisObj.reportData = '';

          return
      }
      thisObj.title = result.data.data[0].title;
      thisObj.reportData = result.data.data[0].data;
      result.data.data[0].data;
    }

    // Set the token 
    callback2(thisObj, res, result) { 
      console.log('Setting the token:'+result.data.token)
      thisObj.token = result.data.token;
    }

    // Register a text & edit a text
    callback3(thisObj, res, result) { 
      console.log('Callback3');
      console.log(result);
    
      if (result.data != undefined) {
        if (result.data.msg != undefined) {
          thisObj.response2 = result.data.msg;
          thisObj.router.navigate(['seeReports']);
        }
      }
      if (result.error != undefined) {
          thisObj.response2 = result.error;
          thisObj.response2 = 'Not completed, duplicate title?';
      }
    }

    // Register a text & edit a text
    callback4(thisObj, res, result) { 
      console.log('Callback4');
      console.log(result);
    
      if (result.data != undefined) {
        if (result.data.msg != undefined) {
          thisObj.response2 = result.data.msg;
          // thisObj.router.navigate(['seeReports']);
        }
      }
      if (result.error != undefined) {
          thisObj.response2 = result.error;
          thisObj.response2 = 'Not completed';
      }
    }

    // ROUTES
    // Display text from week nr
    route1(weekNr) {
      var url = 'https://me-api.ysojs.se/reports/week/' + weekNr;
      var dataObj = {};
      var token = null;
      var obj1 = this;

      this.reportData = '';
      this.title = '';
      this.response2 = '';

      this.ApiCallService.fetchCall(dataObj ,url, 'GET', this.callback, token, obj1);
    }

    // // Add data
    // route2(title, data=null) {
    //   console.log('Title:'+title);
    //   console.log('Data:'+data);
    //   this.response2 = '';

    //   this.reportData = data;
    //   this.title = title;
    // }

    // // Edit data
    // route3(title, data=null, data2=null) {
    //   console.log('Title:'+title);
    //   console.log('Data:'+data);
    //   console.log('Data:'+data2);

    //   this.reportData = data;
    //   this.title = title;
    // }

    // Get token
    route4() {
      console.log('Get token');

      var url = "https://me-api.ysojs.se/token";
      var dataObj = {};
      var obj1 = this;
      this.ApiCallService.fetchCall(dataObj, url, 'GET', this.callback2, null, obj1);
    }

    // Register a text
    // registerText(title, text, token) {
    //   var url = 'https://me-api.ysojs.se/reports/add';
    //   var params;
    //   params = {"title":title, "data1":text};
    //   this.ApiCallService.fetchCall();
    // }


    // Register a text
    route5 (title, text, token=this.token) {
      console.log('Add a text: '+text+' title: '+title+' token: '+token);
      var url = 'https://me-api.ysojs.se/reports/add';
      var obj1 = this;
      var params = {"title":title, "data1":text};
      this.response2 = ''; // Empty response text
      this.ApiCallService.fetchCall(params, url, 'POST', this.callback3, token, obj1);
    }

    // Edit a text
    route6 (title, text, token=this.token) {
      console.log('Add a text: '+text+' title: '+title+' token: '+token);
      var url = 'https://me-api.ysojs.se/reports/edit';
      var obj1 = this;
      var params = {"title":title, "data1":text};
      this.response2 = ''; // Empty response text
      this.ApiCallService.fetchCall(params, url, 'POST', this.callback3, token, obj1);
    }

    // Delete a text
    route7 (title, token=this.token) {
      console.log('Delete title: '+title);
      var url = 'https://me-api.ysojs.se/reports/delete';
      var obj1 = this;
      var params = {"title":title};
      this.response2 = ''; // Empty response text
      this.ApiCallService.fetchCall(params, url, 'POST', this.callback4, token, obj1);
    }
}
