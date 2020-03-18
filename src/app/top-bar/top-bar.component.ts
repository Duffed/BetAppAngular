import { Component, OnInit, HostBinding } from "@angular/core";
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: "top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"]
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean;
  isDarkTheme: boolean;

  constructor(public approot: AppComponent, private auth: AuthService) {

  }
  
  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })

    this.isDarkTheme = this.approot.isDarkTheme;
  }
  
  logout(){
    this.auth.logout();
  }

  toggleTheme() {
    this.approot.toggleTheme();
    this.isDarkTheme = this.approot.isDarkTheme;
  }


}
