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
  selector: 'app-indo-for-amount',
  templateUrl: './indo-for-amount.component.html',
  styleUrls: ['./indo-for-amount.component.css']
})
export class IndoForAmountComponent implements OnInit {

  constructor (public dialogRef: MatDialogRef<IndoForAmountComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
  }
  save(){
    this.dialogRef.close("it was saved");
  }

}
