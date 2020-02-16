import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BetComponent } from './bet/bet.component';
import { BetListComponent } from './bet-list/bet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BetComponent,
    BetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
