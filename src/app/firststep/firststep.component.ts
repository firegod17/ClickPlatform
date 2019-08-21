import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
// import { JsonDecoder } from 'ts.data.json';
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


function httpRequest(method,path,dataObj,callback){
    var endpoint = "http://af356cc4.ngrok.io/"

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

@Component({
  selector: 'app-firststep',
  templateUrl: './firststep.component.html',
  styleUrls: ['./firststep.component.css']
})




export class FirststepComponent implements OnInit, OnDestroy {
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
        this.loadAllUsers();
        this.verificationForm = this.formBuilder.group({
            iTIN: ['', Validators.required],
            fTIN: ['', Validators.required],
            sSN: ['', Validators.required],
            dataOfBirth: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            familyMonthlyIncome: ['', Validators.required],
            incomingFromInvesting: ['', Validators.required],
            otherIncome: ['', Validators.required],
            termLoan: ['', Validators.required],
            loanAmountRequired: ['', Validators.required],
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

      // stop here if form is invalid
      if (this.verificationForm.invalid) {
          return;
      }

      this.loading = true;

    var dataObj={userId:this.currentUser.id,fields:this.verificationForm.value}

    httpRequest('POST','fields/verify',dataObj,(response)=>{
      console.log(response)
    })
    this.alertService.success("You Verify press 'Next Step'")


  }
  openDialogAmount(): void {
  const dialogRef = this.dialog.open(IndoForAmountComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');

  });
}
}
