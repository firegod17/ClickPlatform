import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';
import { Info1Component } from './info1/info1.component';
import { IndoForAmountComponent } from './indo-for-amount/indo-for-amount.component';
import {MatDatepickerModule,MatNativeDateModule,MatIconModule} from '@angular/material';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { User } from '@app/_models';
import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;

@Component({ templateUrl: 'home.component.html',
styleUrls: ['./home.component.css']
 })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    verificationForm: FormGroup;
    loading = false;
    submitted = false;

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
        // this.loadAllUsers();
        this.verificationForm = this.formBuilder.group({
            idUser: this.currentUser,
            iTIN: ['', Validators.required],
            fTIN: ['', Validators.required],
            sSN: ['', Validators.required],
            dataOfBirth: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            familyMonthlyIncome: ['$', Validators.required],
            incomingFromInvesting: ['$', Validators.required],
            otherIncome: ['$', Validators.required],
            termLoan: ['$', Validators.required],
            loanAmountRequired: ['$', Validators.required],

        });

    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

      moveToSelectedTab(tabName: string) {
        for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
          if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName)
     {
        (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
     }
   }
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

    openDialog(): void {
    const dialogRef = this.dialog.open(Info1Component, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  onSubmit() {
      this.submitted = true;

      var name: string;
      switch (name){
        case "trustRejected": {
          this.alertService.error("Trust Rejected");
          break;
        }
        case "trustSubmitted": {
          this.alertService.error("Trust Submitted");
          break;
        }
        default: {
          this.alertService.warning("Nothing doesn't submitted");
        break;
        }
      }

      // stop here if form is invalid
      if (this.verificationForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.verify(this.verificationForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }
  openDialogAmount(): void {
  const dialogRef = this.dialog.open(IndoForAmountComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}
}
