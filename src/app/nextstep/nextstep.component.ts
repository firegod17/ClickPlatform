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
    verificationForm: FormGroup;
    verificationFormAdmin: FormGroup;
    verificationFormBeneficiar: FormGroup;
    verificationFormTrust: FormGroup;
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
      // this.loadAllUsers();
      var name: string;
      this.authenticationService.httpGET("/fields/user",{username:'fire god', password: 'qwerty'},(response)=>{
        name = response.status;
        console.log(response);
      })

      if (name === "trustRejected"){
        this.alertService.error("Trust Rejected");
      }else if (name === "trustSubmitted"){
        this.alertService.success("Trust Submitted");
      }else{
        this.alertService.warning("Please Trust Submitted");
      }

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
          this.alertService.info("Please fill out this form and wait for an answer!");
          break;
        }
      }


      this.verificationForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lasttName: ['', Validators.required],
        Address: ['', Validators.required],
        Address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],

      });
      this.verificationFormAdmin = this.formBuilder.group({
        firstName: ["",Validators.required],
        lasttttName: ["",Validators.required],
        Address1:["",Validators.required],
        Address2:["",Validators.required],
        state:["",Validators.required],
        postalCode:["",Validators.required],
        city:["",Validators.required],
      });

      this.verificationFormTrust = this.formBuilder.group({
        FullName: ['', Validators.required],
      });
      this.verificationFormBeneficiar = this.formBuilder.group({
        FullName: ['', Validators.required],
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
      if (this.verificationForm.invalid) {
        return;
      }

      this.loading = true;
      var fieldsObj=this.verificationForm.value;
      delete fieldsObj['__proto__'];
      var dataObj={
        userId:'5d5580ae7c213e60b8eff18f',
        fields:{
          grantor: fieldsObj,
        }
      }
      this.authenticationService.httpRequest("PUT",'/fields/trust',dataObj,(response)=>{
        console.log(response)
      })
    }

    submittedTrust(){
      this.submitted = true;

      // stop here if form is invalid
      if (this.verificationFormTrust.invalid) {
        return;
      }
      var dataObj={
        userId:'5d5580ae7c213e60b8eff18f',
        fields:{
          trustName: this.verificationFormTrust.value.FullName,
          administrators:[],
          beneficiaries:[]
        }
      }
      this.authenticationService.httpRequest("POST",'/fields/trust',dataObj,(response)=>{
        console.log(response)
      })

    }
    onSubmitDoc(){
      var endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
      var iddoc = "5d5580ae7c213e60b8eff18f"
      window.open(endpoint+'/data/doc?userId='+iddoc)
      this.authenticationService.httpGET('/data/doc',{userId:'5d5580ae7c213e60b8eff18f',method:"download"},(response)=>{
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
        userId:'5d5580ae7c213e60b8eff18f',
        push:'',
        fields:{
          administrators:fieldsObj,
        }
      }
      this.authenticationService.httpRequest("PUT",'/fields/trust',dataObj,(response)=>{
        console.log(response)
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
        userId:'5d5580ae7c213e60b8eff18f',
        push:'',
        fields:{
          beneficiaries:fieldsObj,
        }
      }
      this.authenticationService.httpRequest("PUT",'/fields/trust',dataObj,(response)=>{
        console.log(response)
      })

      this.tabs.splice(index, 1);
    }

    removeTab(index: number) {
      this.tabs.splice(index, 1);
    }
  }
