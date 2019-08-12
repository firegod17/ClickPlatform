import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialog} from '@angular/material';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';


@Component({
  selector: 'app-info1',
  templateUrl: './info1.component.html',
  styleUrls: ['./info1.component.css']
})
export class Info1Component implements OnInit{

  constructor (public dialogRef: MatDialogRef<Info1Component>,
  @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
  }
  save(){
    this.dialogRef.close("it was saved");
  }
}
