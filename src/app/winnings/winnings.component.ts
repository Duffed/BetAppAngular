import { Component, OnInit, DoCheck, Input } from "@angular/core";
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
  @Input() userID: string
  combinations$: Observable<CombinationBet[]>;
  tipsLength: number;
  stake: number;
  
  constructor(private tipService: TipService) { }
  
  async ngOnInit(): Promise<void> {
    this.combinations$ = this.tipService.getCombinationBets();
    
    this.tipService.getNumberOfBets(this.userID).subscribe(observer => {
      this.tipsLength = observer
    })

    this.stake = await this.tipService.getStake(this.userID);
  }

  setStake(amount: HTMLInputElement) {
    this.tipService.setStake(Number(amount.value), this.userID);
  }
}
