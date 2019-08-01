import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AlertService, UserService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';


@Component({
  selector: 'app-my-password',
  templateUrl: './my-password.component.html',
  styleUrls: ['./my-password.component.css']
})
export class MyPasswordComponent implements OnInit {


  constructor(private _router: Router) { }
  onBack(): void {
     this._router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
