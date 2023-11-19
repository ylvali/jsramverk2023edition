import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs'; 

// import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { apiData } from './apiData';

import { User } from './User';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http: HttpClient) { }

  private reqUrl = 'me-api.ysojs.se';  // URL to web api

  public response1 = '';

  // users : User[] = [];

  // ------------------------------- Methods
  // Initial call onInit
  // ngOnInit(): void {
  // };

  // getUsers():Observable<User[]> {
  //   const users1 = of(this.users);
  //   return users1;
  // }

  fetchCall = function( 
      dataObj,
      url,
      method,
      callback,
      token = null,
      thisObj = null
      // maxTime = 5000
  ) {
    var result; // The result data
    var res; // The result
    var theBody; // The body

    // Fetch body
    theBody = {
        body: JSON.stringify(dataObj),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: method,
        // signal: app.ajax.signal // Controller signal for aborting fetch
    };

    if (method == 'GET') {
        theBody = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-access-token': token
            },
            method: method,
            // signal: app.ajax.signal // Controller signal for aborting fetch
        };
    }

    fetch(url, theBody)
    .then(function (response) {

        // Return response
        return response.json();

    }).then(function(result) {
        // console.log(result);
        var res;// The result

        if (result.errors) {
            // console.log('Error response: ');
            // console.log(result.errors.title);
            // console.log(result.errors.detail);

            if (result.errors.status == 500) {
                res = "Status 500, database error. ";
                res += "Data not accepted. Perhaps a duplicate.";
                // res += result.errors.title;
            }

            if (result.errors.status == 401) {
                res = "Status 401, database error. ";
                res += result.errors.title;
            }
        }

        if (result.data) {
            res = result.data.message;
        }

        // Send callback result
        callback(thisObj, res, result);
    });
    }
    

    reqCall(method, url, callback2, thisObj, params = null, header = null) {
      console.log('Server call via XMLHttpRequest');
      // console.log(callback1);
      var request;
      var res = '';
  
      if (window.XMLHttpRequest) {
          request = new XMLHttpRequest();
      }
      if (!window.XMLHttpRequest) {
          return 'NoXMLHttpRequest';
      }
  
      try {
          request.onreadystatechange = function() {
            // console.log(request);
            if (request.readyState == 4) {
                // res contains the data from the server
                res = request.responseText;
  
                // Send the result to the callback
                this.response1 = res;
                return callback2(thisObj,res);
            }
          };
          request.open(method, url, true);

          // Set multiple headers
          if (header) {
              if (!Object(header)) {
                return false;
              }
              // Check what the header includes
              // header.forEach((element) => console.log(element));

              // Set the headers
              for (var key in header) {
                request.setRequestHeader(key, header[key]);
              }

              //request.setRequestHeader('Content-Type', header);
          }
          request.send(params);
          res = request.responseText;
          this.response1 = res;
          return callback2(thisObj,res);
          
          
      } catch (e) {
          console.log('Unable to connect to the server');
          console.log(e);
          return 'incompleted';
      }
    }
  
    callback1(res) {
      console.log(res);
      return res;
    }

    // /** GET from the server w angular http */
    // getCall(): Observable<apiData> {
    //     return this.http.get(this.reqUrl)
    //       .pipe(
    //         // tap(_ => this.log('fetched heroes')),
    //         catchError(this.handleError('getCall', []))
    //   );
    // }
    
            
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        // this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    
}
