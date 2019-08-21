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

function handleFileSelect(evt) {
    var	endpoint = 'http://alcyone.meta-exchange.info/kyc/api'
    var file = evt.target.files[0];

    openFile(file,(dataURL)=>{
        var requestObj={
            userId:'5d55413393a5416114a113df',
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

  constructor() { }

  ngOnInit() {

  }

  download() {

  }

  update() {
    var file_select=document.getElementById('/Users/firegod/Downloads/doc.pdf')
    file_select.addEventListener('change', handleFileSelect, false);
  }
}
