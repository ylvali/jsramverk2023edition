import { Component } from '@angular/core';

import { ApiCallService } from '../api-call.service';

import { NgOptimizedImage } from '@angular/common'


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent {

  constructor( 
    private ApiCallService: ApiCallService) { 
      this.route1();
    }

  response1 = '';
  title1 = 'Project'; 
  title2 = 'Introduction'; 
  data1 = 'Welcome to this page - dedicated to building a web application at BTH - Blekinge Technical Institute. <br><b>"Application software, computer software designed to help the user to perform specific tasks" </b> Wikipedia <br> Backend : Nodejs & Express. <br> Frontend : Angular ';

  // THE CALLBACKS
  callback1(thisObj, res, result) {
    console.log('Callback1');
    console.log(res);
    console.log(result);

    thisObj.response1 = result.data.pres2;
  }

  // API
  callAPi2(method, url, callback, dataObj = null, token=null) {
    var obj1 = this;
    if (!dataObj) {
      dataObj = {};
    }
    this.ApiCallService.fetchCall(dataObj ,url, method, callback, token, obj1);
  }

  // ROUTES
  route1() {
    this.callAPi2('GET', 'https://me-api.ysojs.se', this.callback1);
  }
}
