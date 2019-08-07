// import { Injectable, NgZone } from '@angular/core';
// // import { AngularFireAuth } from "@angular/fire/auth";
// import { Router } from "@angular/router";
// import { Observable, Subject } from 'rxjs';
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class AuthService {
//
//   constructor(
//     public afAuth: AngularFireAuth, // Inject Firebase auth service
//     public router: Router, // Inject Route Service
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {
//   }
//
//   // Send email verfificaiton when new user sign up
//   SendVerificationMail() {
//     return this.afAuth.auth.currentUser.sendEmailVerification()
//     .then(() => {
//       this.router.navigate(['verify-email']);
//     })
//   }
//
//   // Sign up with email/password
//   SignUp(email, password) {
//     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
//       .then((result) => {
//         this.SendVerificationMail(); // Sending email verification notification, when new user registers
//       }).catch((error) => {
//         window.alert(error.message)
//       })
//   }
//
//   // Sign in with email/password
//
//
// }
