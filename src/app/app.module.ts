import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from '../environments/environment';

// Firestore
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';

// Material
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from "@angular/material/divider";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// Components
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { BetListComponent } from "./bet-list/bet-list.component";
import { TipComponent } from "./tip/tip.component";
import { TipListComponent } from "./tip-list/tip-list.component";
import { AddTipDialogComponent } from "./add-tip-dialog/add-tip-dialog.component";
import { WinningsComponent } from "./winnings/winnings.component";
import { ServiceWorkerModule } from '@angular/service-worker';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BetListComponent,
    TipComponent,
    TipListComponent,
    AddTipDialogComponent,
    WinningsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule, AngularFireAuthModule, FirebaseUIModule, FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [MatDatepickerModule, {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerGestureConfig
  }],
  bootstrap: [AppComponent],
  entryComponents: [AddTipDialogComponent]
})
export class AppModule {}
