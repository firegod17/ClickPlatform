import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';


import {MatDatepickerModule,MatNativeDateModule,MatIconModule} from '@angular/material';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule } from '@angular/material';
import { User } from '@app/_models';
import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
// declare var $: any;

@Component({
  selector: 'app-nextstep',
  templateUrl: './nextstep.component.html',
  styleUrls: ['./nextstep.component.css']
})
export class NextstepComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  verifyNextStep: any;
  loading = false;
  submitted = false;
  step = 0;
  tabs = ['Administrator number 1', 'Administrator number 2', 'Administrator number 3'];
  selected = new FormControl(0);
  countertabs = 3;





  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    private alertService: AlertService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
    this.loadAllUsers();
    this.verifyNextStep = this.formBuilder.group({
      fullName: ['', Validators.required],
        verificationForm: this.formBuilder.group({
            firstName1: ['', Validators.required],
            lasttName: ['', Validators.required],
            Address: ['', Validators.required],
            Address2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
         }),
         verificationFormAdmin: this.formBuilder.group({
            firstName: ["",Validators.required],
            lasttttName: ["",Validators.required],
            Address1:["",Validators.required],
            Address2:["",Validators.required],
            state:["",Validators.required],
            postalCode:["",Validators.required],
            city:["",Validators.required],
        }),
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  addTab(selectAfterAdding: boolean) {

     this.countertabs = this.countertabs + 1 ;
    // if (selectAfterAdding)
    // {
       this.tabs.push( "Administrator number " + this.countertabs);
    // }
    // this.tabs.push('New');
    //
    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }
  onSubmit() {
        this.submitted = true;

         // stop here if form is invalid
        if (this.verifyNextStep.invalid) {
            return;
        }

         this.loading = true;
        this.userService.grantor(this.verificationForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

     onSubmitAdmin() {
        this.submitted = true;

         // stop here if form is invalid
        if (this.verificationFormAdmin.invalid) {
            return;
        }

         this.loading = true;
        this.userService.administrator(this.verificationFormAdmin.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}
