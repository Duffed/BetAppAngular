import { Component, OnInit, DoCheck } from "@angular/core";
import { CombinationBet } from "src/domain/combinationBet";
import { TipService } from "../tip.service";
import { Tip } from "src/domain/tip";
import { Observable } from 'rxjs';

@Component({
  selector: "winnings",
  templateUrl: "./winnings.component.html",
  styleUrls: ["./winnings.component.scss"]
})
export class WinningsComponent implements OnInit, DoCheck {
  combinations: CombinationBet[];
  tipsLength: Observable<number>;
  stake: Observable<number>;

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // if (this.combinations !== this.tipService.getCombinationBets()) {
      
    //   this.combinations = this.tipService.getCombinationBets();
    //   // this.tipsLength = this.tipService.getTips();
    // }

    // this.tipService.getCombinationBets().then(res => { this.combinations = res })
  }
  
  constructor(private tipService: TipService) {

  }
  
  ngOnInit(): void {
    this.tipService.getCombinationBets().then(result => { this.combinations = result });
    this.stake = this.tipService.getStake();
    this.tipsLength = this.tipService.getNumberOfBets();
  }

  setStake(amount: HTMLInputElement) {
    this.tipService.setStake(Number(amount.value));
  }
}
