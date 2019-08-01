﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { PassportComponent } from './passport';
import { AddressComponent } from './address';
import { SelfiphotoComponent } from './selfiphoto';
import { StatisticsComponent } from './statistics';
import { MyPasswordComponent } from './my-password';
import { VerifyEmailComponent } from './verify-email';




const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'passport', component: PassportComponent },
    { path: 'address', component: AddressComponent },
    { path: 'selfiphoto', component: SelfiphotoComponent },
      { path: 'statistics', component: StatisticsComponent },
          { path: 'my-password', component: MyPasswordComponent },
          { path: 'verify-email', component: VerifyEmailComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
