import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  loggedIn: Subject<boolean> = new Subject();
  
  constructor(private firebaseAuth: AngularFireAuth) { 
    this.user = firebaseAuth.authState;
  }

  getAuthStateObserver() {
    return this.firebaseAuth.auth.onAuthStateChanged;
  }

  // Sign in with Google
  googleLogin() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }  

  private authLogin(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
    .then((result) => {
        this.loggedIn.next(true);
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        this.loggedIn.next(false);
        console.log(error)
    })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut().then((result) => {
        console.log("User logged out");
      }).catch(error => console.log(error));
  }
}
