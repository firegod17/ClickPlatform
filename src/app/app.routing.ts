import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

import { StatisticsComponent } from './statistics';
import { MyPasswordComponent } from './my-password';
import { VerifyEmailComponent } from './verify-email';
import { NextstepComponent } from './nextstep';
import { FirststepComponent } from './firststep';





const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'my-password', component: MyPasswordComponent },
    { path: 'verify-email', component: VerifyEmailComponent },
    { path: 'nextstep', component: NextstepComponent },
    {path: 'firststep', component: FirststepComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
