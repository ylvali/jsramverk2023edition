import { Component } from '@angular/core';

import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-see-reports',
  templateUrl: './see-reports.component.html',
  styleUrls: ['./see-reports.component.css']
})
export class SeeReportsComponent {

  constructor( 
    private ApiCallService: ApiCallService,
    ) { 
      this.callApi();
    }

    response = ''; 
    reports = [];


  // Register a text & edit a text
  callback(thisObj, res, result) { 
    console.log('Callback');
    console.log(result);
  
    if (result.data != undefined) {
      if (result.data.msg != undefined) {
        thisObj.response = result.data.msg;
        thisObj.reports = result.data.data;
      }
    }
    if (result.error != undefined) {
        thisObj.response = result.error;
        thisObj.response = 'Not completed, duplicate title?';
    }
  }

  // Get reports 
  // Call the api routes
  callApi() {
    var obj1 = this;
    var token = null;
    var url = 'https://me-api.ysojs.se/reports/all/';
    var dataObj = {};
    this.ApiCallService.fetchCall(dataObj ,url, 'GET', this.callback, token , obj1);
  }

}
