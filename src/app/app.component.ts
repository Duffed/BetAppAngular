import { Component, HostBinding, OnInit } from "@angular/core";
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './auth.service';
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
  isDarkTheme: boolean;

  // Swipe
  selected = 0;
  tab_num = 2;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  THEMES = { DARK: "dark-theme", LIGHT: "light-theme" };
  
  constructor(public overlayContainer: OverlayContainer, 
      private auth: AuthService, 
      private tipService: TipService) {

    if (localStorage.getItem(this.THEMES.DARK) == null) {
      this.onSetTheme(this.THEMES.DARK);
      localStorage.setItem(this.THEMES.DARK, "true")
      this.isDarkTheme = true;
    } else {
      if (localStorage.getItem(this.THEMES.DARK) === "true") { 
        this.onSetTheme(this.THEMES.DARK);
        this.isDarkTheme = true;
      } else {
        this.onSetTheme(this.THEMES.LIGHT);
        this.isDarkTheme = false;
      }
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem(this.THEMES.DARK, this.isDarkTheme? "true":"false");
    if (this.isDarkTheme){
      this.onSetTheme(this.THEMES.DARK) 
    } else {
      this.onSetTheme(this.THEMES.LIGHT) 
    }
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
    if (theme === this.THEMES.DARK) {
      this.overlayContainer.getContainerElement().classList.remove(this.THEMES.LIGHT);
      this.overlayContainer.getContainerElement().classList.add(this.THEMES.DARK);
    } else {
      this.overlayContainer.getContainerElement().classList.remove(this.THEMES.DARK);
      this.overlayContainer.getContainerElement().classList.add(this.THEMES.LIGHT);
    }
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
