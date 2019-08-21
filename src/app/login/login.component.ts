import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// declare var foo: userObj;

import { AlertService, AuthenticationService } from '@app/_services';

function httpGET(path,dataObj,callback){
    var endpoint = "http://f289c90e.ngrok.io"

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


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    userObj:any[]=[];


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,

    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        var dataObj={username:this.loginForm.value.username,password:this.loginForm.value.password}
        console.log(this.loginForm.value)


      // httpGET("/fields/user",dataObj,(response)=>{
      //
      //  this.userObj = {username:this.response.value.username};
      //  console.log( this.userObj);
      //  this.authenticationService.login(this.res)
      //
      // })

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }


        this.authenticationService.login(this.f.username.value, this.f.password.value)
        // console.log(this.f.username.value, this.f.password.value)

            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
