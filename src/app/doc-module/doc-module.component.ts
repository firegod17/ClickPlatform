import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';

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
import {MatTooltipModule} from '@angular/material/tooltip';

function httpRequest(method,path,dataObj,callback){
  var endpoint = "http://alcyone.meta-exchange.info/kyc/api"

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

function openFile (file,callback) {
	  var endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;//stores data from file in datURL format
      callback(text);
    };
    reader.readAsDataURL(file);
};
function httpGET(path,dataObj,callback){
  var	endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
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



function handleFileSelect(evt) {
    var	endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
    var file = evt.target.files[0];

    openFile(file,(dataURL)=>{
        var requestObj={
            userId:this.currentUser._id,
            dataURL: dataURL

        }
        httpRequest("PUT",'/data/doc',requestObj,(response)=>{
            console.log(response)
        })
    })
}


@Component({
  selector: 'app-doc-module',
  templateUrl: './doc-module.component.html',
  styleUrls: ['./doc-module.component.css'],

})
export class DocModuleComponent implements OnInit {

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
    var name: string;
    this.authenticationService.httpGET("/fields/user",{username:this.currentUser.username, password: this.currentUser.password},(response)=>{
      name = response.status;
      console.log(name);
      console.log(response);

      if (name == "trustRejected"){
        this.alertService.error("Trust Rejected. Please repeat!");
      }else if (name == "ucc1"){
        this.alertService.success("Trust Submitted. Download you docs.");
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
    })

  }

  download() {
    var	endpoint = 'http://alcyone.meta-exchange.info/kyc/api';
   // httpGET('/data/doc',{userId:'5d55413393a5416114a113df',method:"download"});
  window.open(endpoint+'/data/doc?userId='+this.currentUser._id+'&method=download')
}
open(){
  var	endpoint = 'http://alcyone.meta-exchange.info/kyc/api';
  window.open(endpoint+'/data/doc?userId='+this.currentUser._id)
}

handleFileSelect(event) {
    var	endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
    var file = event.target.files[0];

    openFile(file,(dataURL)=>{
        var requestObj={
            userId:this.currentUser._id,
            dataURL: dataURL

        }
        httpRequest("PUT",'/data/doc',requestObj,(response)=>{
            console.log(response)
        })
    })
}

  update(event) {
    let files = event.target.files;
    let id = this.currentUser._id;
    console.log(files);
    // dataURL = 'C:\Users\Lipa\Desktop\1'
    var requestObj={
        userId: id,
        dataURL: files
      }


    httpRequest("PUT",'/data/doc',requestObj,(response)=>{
        console.log(response)
    })
  }
}
