import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
@Component({
   templateUrl: 'passport.component.html',
   styleUrls: ['./passport.component.css']
 })

export class PassportComponent implements OnInit{
passportForm: FormGroup;
loading = false;
submitted = false;
currentUser: User;
 currentUserSubscription: Subscription;
 users: User[] = [];



    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router,
        private authenticationService: AuthenticationService,

    ){
        // redirect to home if already logged in
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }


    ngOnInit() {
        this.passportForm = this.formBuilder.group({
          idUser: this.currentUser,
          name: ['', [Validators.required, Validators.pattern('[A-Z,a-z]*')]],
          surname: ['', [Validators.required, Validators.pattern('[A-Z,a-z]*')]],
          middleName: ['', [Validators.required, Validators.pattern('[A-Z,a-z]*')]],
          dayOfBirthday: ['', Validators.required],
          monthOfBirthday: ['', Validators.required],
          yearOfBirthday: ['', Validators.required],
          documentSeriesAndNumber: ['', [Validators.required, Validators.pattern('[A-Z,a-z,0-9]*')]],
          countryOfIssue: ['', [Validators.required, Validators.pattern('[A-Z,a-z]*')]],
          dayOfIssue: ['', Validators.required],
          monthOfIssue: ['', Validators.required],
          yearOfIssue: ['', Validators.required],
          commentUser: [''],
        });

        // get return url from route parameters or default to '/'

    }
    get f() { return this.passportForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.passportForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.passport(this.passportForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.alertService.success('You are Verify', true);
                  this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
  }
