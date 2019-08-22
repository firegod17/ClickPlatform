import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { RouterModule, Routes } from '@angular/router';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { StatisticsComponent } from './statistics';
import { MyPasswordComponent } from './my-password';
// import { AuthService } from '@app/_services';
import { VerifyEmailComponent } from './verify-email';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule,MatNativeDateModule,MatIconModule} from '@angular/material';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { Info1Component } from './home/info1/info1.component';
import { IndoForAmountComponent } from './home/indo-for-amount/indo-for-amount.component';
import { NextstepComponent } from './nextstep';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';
import { FirststepComponent } from './firststep/firststep.component';
import { DocModuleComponent } from './doc-module/doc-module.component';
import {MatCardModule} from '@angular/material/card';




@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        RouterModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatStepperModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatExpansionModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatTooltipModule,
        MatCardModule,


    ],

    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        StatisticsComponent,
        MyPasswordComponent ,
        VerifyEmailComponent,
        Info1Component,
        IndoForAmountComponent,
        NextstepComponent,
        FirststepComponent,
        DocModuleComponent
        ],
    entryComponents: [
        Info1Component,
        IndoForAmountComponent,


       ],
    providers: [
        MatDatepickerModule,
        MatExpansionModule,



        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
    ],

    bootstrap: [AppComponent]
})

export class AppModule { }
