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
export class WinningsComponent implements OnInit {
  combinations$: Observable<CombinationBet[]>;
  tipsLength: number;
  stake: number;
  
  constructor(private tipService: TipService) { }
  
  async ngOnInit(): Promise<void> {
    this.combinations$ = this.tipService.getCombinationBets();
    
    this.tipService.getNumberOfBets().subscribe(observer => {
      this.tipsLength = observer
    })

    this.stake = await this.tipService.getStake();
  }

  setStake(amount: HTMLInputElement) {
    this.tipService.setStake(Number(amount.value));
  }
}
