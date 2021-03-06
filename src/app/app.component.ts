import { Component, HostBinding, OnInit } from "@angular/core";
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from './services/auth.service';

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
  THEMES = { DARK: "dark-theme", LIGHT: "light-theme" };

  constructor(public overlayContainer: OverlayContainer,
      private auth: AuthService) {

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
        this.userID = user.uid;
      } else {
        this.isLoggedIn = false;
        this.userID = "anonymous";
      }

    })
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
}
