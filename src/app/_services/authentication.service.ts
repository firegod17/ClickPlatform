import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

function httpGET(path,dataObj,callback){
  var endpoint="http://alcyone.meta-exchange.info/kyc/api";
    var httpGet = new XMLHttpRequest();
    httpGet.onreadystatechange = ()=>{
      if (httpGet.readyState == 4 && httpGet.status == 200) {
          var response = JSON.parse(httpGet.responseText);
          var returnVar = callback(response);
          if(returnVar!=null){
            return returnVar;
          }
      }
    };
    var queryString = Object.keys(dataObj).map(function(key) {
        return key + '=' + dataObj[key]
    }).join('&');
    httpGet.open('GET', endpoint+path+"?"+queryString, true);
    httpGet.send();
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

    login(username: string, password: string) {
        var globalUser;
         return httpGET("/fields/user", { username: "fire god", password: "qwerty"}, (user)=>{
                // login successful if there's a jwt token in the response
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.token = "asrdtfghkjl";
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    // globalUser = user;
                    return user;
            });
        // return globalUser;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
