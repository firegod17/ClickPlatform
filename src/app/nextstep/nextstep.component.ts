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
    status: false;
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
    verificationForm: FormGroup;
    verificationFormAdmin: FormGroup;
    verificationFormBeneficiar: FormGroup;
    verificationFormTrust: FormGroup;
    loading = false;
    submitted = false;
    step = 0;
    tabs = ['Administrator 1', 'Administrator 2', 'Administrator 3'];
    tabsBenef = ['Benefieciar 1', 'Benefieciar 2', 'Benefieciar 3'];
    selected = new FormControl(0);
    countertabs = 3;
    countertabsBenef = 3;





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
      console.log(this.currentUser._id)
      var name: string;
      this.authenticationService.httpGET("/fields/user",{email:this.currentUser.email, password: this.currentUser.password},(response)=>{
        name = response.status;
        console.log(name);
        console.log(response);

        if (name == "trustRejected"){z
          this.alertService.error("Trust Rejected. Please repeat!");
        }else if (name == "ucc1"){
          this.alertService.success("Trust Submitted. Download you docs.");
          this.status = true;
        }else if (name == "ucc"){
          this.alertService.warning("Trust on check, wait!");
          setTimeout(function(){
            window.location.reload();
          }, 30000);
        }else if (name == "docRejected"){
          this.alertService.error("Incorrect Docs. Update Again!");
        }else if (name == "docSubmitted"){
          this.alertService.success("WOHO!");
        }else{
          this.alertService.info("Please fill out this form and wait for an answer!");
        }
      });


      this.verificationForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        Address: ['', Validators.required],
        Address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        email: ['', Validators.required],


      });
      this.verificationFormAdmin = this.formBuilder.group({
        firstName: ["",Validators.required],
        lastName: ["",Validators.required],
        Address1:["",Validators.required],
        Address2:["",Validators.required],
        state:["",Validators.required],
        postalCode:["",Validators.required],
        city:["",Validators.required],
        email:["",Validators.required],

      });

      this.verificationFormTrust = this.formBuilder.group({
        FullName: ['', Validators.required],
        email: ['', Validators.required],
      });
      this.verificationFormBeneficiar = this.formBuilder.group({
        FullName: ['', Validators.required],
        email: ['', Validators.required],
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

    moveToSelectedTab(tabName: string) {
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName)
        {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
    }

    addTabAdmin(selectAfterAdding: boolean) {

      this.countertabs = this.countertabs + 1 ;
       // if (selectAfterAdding)
       // {
       if (selectAfterAdding){
         this.tabs.push( "Administrator  " + this.countertabs);
       }
       // }
       // this.tabs.push('New');
      //
      if (selectAfterAdding) {
        this.selected.setValue(this.tabs.length - 1);
      }
    }

    addTabBeneficiar(selectAfterAdding: boolean) {

      this.countertabsBenef = this.countertabsBenef + 1 ;
       // if (selectAfterAdding)
       // {
       if (selectAfterAdding){
         this.tabsBenef.push( "Benefieciar " + this.countertabsBenef);
       }
       // }
       // this.tabs.push('New');
      //
      if (selectAfterAdding) {
        this.selected.setValue(this.tabsBenef.length - 1);
      }
    }

    removeTab(index: number) {
      this.tabs.splice(index, 1);
      this.countertabs = this.countertabs - 1 ;

    }
    removeTabBenef(index: number) {
      this.tabsBenef.splice(index, 1);
      this.countertabsBenef = this.countertabsBenef - 1 ;

    }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.verificationForm.invalid) {
        return;
      }

      this.loading = true;
      var fieldsObj=this.verificationForm.value;
      delete fieldsObj['__proto__'];
      var dataObj={
        userId:this.currentUser._id,
        fields:{
          grantor: fieldsObj,
        }
      }
      this.authenticationService.httpRequest("PUT",'/fields/trust',dataObj,(response)=>{
        console.log(this.verificationForm.value)
        this.alertService.success("Grantor was Submit!");
      })
    }

    submittedTrust(){
      this.submitted = true;

      // stop here if form is invalid
      if (this.verificationFormTrust.invalid) {
        return;
      }
      var dataObj={
        userId:this.currentUser._id,
        fields:{
          trustName: this.verificationFormTrust.value.FullName,
          email: this.verificationFormTrust.value.email,
          administrators:[],
          beneficiaries:[]
        }
      }
      this.authenticationService.httpRequest("POST",'/fields/trust',dataObj,(response)=>{
        console.log(response)
        this.alertService.success("Trust was Submit! Full name:"+this.verificationFormTrust.value.FullName);
      })

    }
    onSubmitDoc(){
      var endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
      var iddoc = this.currentUser._id
      window.open(endpoint+'/data/doc?userId='+iddoc)
      this.authenticationService.httpGET('/data/doc',{userId: this.currentUser._id,method:"download"},(response)=>{
         console.log(response);
      })

    }

    onSubmitAdmin(index: number) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.verificationFormAdmin.invalid) {
        return;
      }

      this.loading = true;

      var fieldsObj=this.verificationFormAdmin.value;
      delete fieldsObj['__proto__'];
      var dataObj={
        userId:this.currentUser._id,
        push:'',
        fields:{
          administrators:fieldsObj,
        }
      }
      this.authenticationService.httpRequest("PUT",'/fields/trust',dataObj,(response)=>{
        console.log(response)
        this.alertService.success("Admin was Submit! Name: "+this.verificationFormAdmin.value.firstName);

      })

      this.tabs.splice(index, 1);
    }

    onSubmitBeneficiar(index: number) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.verificationFormBeneficiar.invalid) {
        return;
      }

      this.loading = true;

      var fieldsObj=this.verificationFormBeneficiar.value;
      delete fieldsObj['__proto__'];
      var dataObj={
        userId:this.currentUser._id,
        push:'',
        fields:{
          beneficiaries:fieldsObj,
        }
      }
      this.authenticationService.httpRequest("PUT",'/fields/trust',dataObj,(response)=>{
        console.log(response)
        this.alertService.success("Benefieciar was Submit! Full Name: "+this.verificationFormBeneficiar.value.FullName);
      })

      this.tabsBenef.splice(index, 1);
    }



  }
