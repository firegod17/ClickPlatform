import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '@app/_models';


import { AlertService, UserService, AuthenticationService } from '@app/_services';
declare var $: any;

function httpRequest(method,path,dataObj,callback){
    var endpoint = "http://alcyone.meta-exchange.info/kyc/api/"

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

@Component({templateUrl: 'register.component.html'})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            number: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(13), Validators.pattern('[0-9]*')]],
            email: ['', [Validators.required, Validators.email]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

    }



    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        var dataObj={fields:this.registerForm.value}

        httpRequest('POST','fields/user',dataObj,(response)=>{
          console.log(response)
              this.router.navigate(['/login']);
        })



    }
}
