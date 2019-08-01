import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@app/_models';
import { AlertService, UserService, AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  addressForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService

  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }

  ngOnInit() {
    this.loadAllUsers();
    this.addressForm = this.formBuilder.group({
          idUser: this.currentUser,
          address: ['', [Validators.required, Validators.pattern('[A-Z,a-z,0-9]*')]],
          city: ['', [Validators.required, Validators.pattern('[A-Z,a-z]*')]],
          zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('[0-9]*')]],
          dayOfIssue: ['', Validators.required],
          monthOfIssue: ['', Validators.required],
          yearOfIssue: ['', Validators.required],
          countryOfIssue: ['', [Validators.required, Validators.pattern('[A-Z,a-z]*')]],
          commentUser: [''],
        });
  }
  get f() { return this.addressForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.addressForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.address(this.addressForm.value)
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
