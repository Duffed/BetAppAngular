import { Component, HostBinding, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { TipService } from './tip.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  themeClass: string;
  isLoggedIn: boolean;
  userID: string;

  // Swipe
  selected = 0;
  tab_num = 2;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  
  constructor(public overlayContainer: OverlayContainer, private auth: AuthService, private tipService: TipService) {
    this.onSetTheme("dark-theme");
  }
  
  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.tipService.userIDSubject.next(user.uid);
        this.userID = user.uid;
      } else {
        this.isLoggedIn = false;
        this.tipService.userIDSubject.next("anonymous");
        this.userID = "anonymous";
      }
      
    })
  }
  
  googleLogin() {
    this.auth.googleLogin();
  }
  
  
  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  swipe(eType){
    console.log(eType);
    if(eType === this.SWIPE_ACTION.LEFT && this.selected > 0){
      console.log("movin left")
      this.selected--;
    }
    else if(eType === this.SWIPE_ACTION.RIGHT && this.selected < this.tab_num){
      console.log("movin right")
      this.selected++;
    }
    console.log(this.selected)
  }
}
