import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// declare var foo: userObj;

import { AlertService, AuthenticationService } from '@app/_services';



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
            email: ['', Validators.required],
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
        var dataObj={email:this.loginForm.value.email,password:this.loginForm.value.password}
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


        this.authenticationService.login(this.f.email.value, this.f.password.value)
        // console.log(this.f.username.value, this.f.password.value)

            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
