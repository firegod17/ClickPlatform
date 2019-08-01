import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Routes, RouterModule} from '@angular/router';



import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'passport.component.html' })

export class PassportComponent{ }
