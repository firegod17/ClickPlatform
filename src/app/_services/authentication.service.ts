import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

function httpGET(path,dataObj,callback,async=true){
    function parseResponse(){
        if (httpGet.readyState == 4 && httpGet.status == 200) {
            var response = JSON.parse(httpGet.responseText);
            var returnObj = callback(response)
            if (returnObj!=null) return returnObj
        }
    }

    var endpoint="http://alcyone.meta-exchange.info/kyc/api";
    var httpGet = new XMLHttpRequest();
    if (async){httpGet.onreadystatechange = parseResponse;}
    var queryString = Object.keys(dataObj).map(function(key) {
        return key + '=' + dataObj[key]
    }).join('&');
    httpGet.open('GET', endpoint+path+"?"+queryString, async);
    httpGet.send();
    if (!async){return parseResponse()}
  }


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    httpRequest(method,path,dataObj,callback){
      var endpoint = "http://alcyone.meta-exchange.info/kyc/api"

      var httpPost = new XMLHttpRequest();

      httpPost.onload = function(err) {
        if (httpPost.readyState == 4 && httpPost.status == 200){
          var response=JSON.parse(httpPost.responseText)//here you will get uploaded image id
          callback(response);
        } else {
          console.log(err);
        }
      }
      httpPost.open(method, endpoint+path, true);
      httpPost.setRequestHeader('Content-Type', 'application/json');//Specifies type of request
      httpPost.send(JSON.stringify(dataObj))
    }

    httpGET(path,dataObj,callback){
      var endpoint = "http://alcyone.meta-exchange.info/kyc/api"

      var httpGet = new XMLHttpRequest();
      httpGet.onreadystatechange = ()=>{
        if (httpGet.readyState == 4 && httpGet.status == 200) {
          var response = JSON.parse(httpGet.responseText);
          callback(response)
        }
      };
      var queryString = Object.keys(dataObj).map(function(key) {
        return key + '=' + dataObj[key]
      }).join('&');
      httpGet.open('GET', endpoint+path+"?"+queryString, true);
      httpGet.send();
    }

    login(username: string, password: string) {
        var userObj = httpGET("/fields/user", {username: username,password: password },(userObj)=>{
          userObj.token='a';
          return of(userObj)
        },false)
        return userObj.pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
