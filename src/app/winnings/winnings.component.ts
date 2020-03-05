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
  combinations$: Observable<CombinationBet[]>;
  tipsLength: number;
  stake: number;

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    // let a = await this.tipService.getCombinationBets();
    // if (this.combinations !== this.tipService.getCombinationBets()) {
      
    //   this.combinations = this.tipService.getCombinationBets();
    //   // this.tipsLength = this.tipService.getTips();
    // }

    // this.tipService.getCombinationBets().then(res => { this.combinations = res })
  }
  
  constructor(private tipService: TipService) { }
  
  async ngOnInit(): Promise<void> {
    this.combinations$ = this.tipService.getCombinationBets();
    this.stake = await this.tipService.getStake();
    this.tipsLength = await this.tipService.getNumberOfBets();
  }

  setStake(amount: HTMLInputElement) {
    this.tipService.setStake(Number(amount.value));
  }
}
