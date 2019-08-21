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

@Component({
  selector: 'app-doc-module',
  templateUrl: './doc-module.component.html',
  styleUrls: ['./doc-module.component.css'],

})
export class DocModuleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
