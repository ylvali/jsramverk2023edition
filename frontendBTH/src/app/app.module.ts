import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ReportComponent } from './reports/report.component';
import { Report2Component } from './report2/report2.component';
import { AboutComponent } from './about/about.component';
import { FormComponent } from './form/form.component';
import { HttpReqComponent } from './http-req/http-req.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiConnectComponent } from './api-connect/api-connect.component';

const appRoutes: Routes = [
  { path: 'reports/week/1', component: ReportComponent },
  { path: 'reports/week/2', component: Report2Component },
  { path: '', component: AboutComponent },
  { path: 'form', component: FormComponent },
  { path: 'api', component: ApiConnectComponent }
  ]

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    Report2Component,
    AboutComponent,
    FormComponent,
    HttpReqComponent,
    ApiConnectComponent
    ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
    { enableTracing: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
