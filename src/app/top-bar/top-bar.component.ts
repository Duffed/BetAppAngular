import { Component, OnInit } from "@angular/core";
import { BetService } from "../bet.service";
import { AuthService } from '../auth.service';

@Component({
  selector: "top-bar",
  templateUrl: "./top-bar.component.html",
  styleUrls: ["./top-bar.component.scss"]
})
export class TopBarComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(private auth: AuthService) {}
  
  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log(this.isLoggedIn);

    })
  }
  
  logout(){
    this.auth.logout();
  }
}
