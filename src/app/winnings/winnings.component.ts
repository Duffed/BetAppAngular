import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { CombinationBet } from "src/app/domain/combinationBet";
import { TipService } from "../services/tip.service";
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
  stake$: number;

  constructor(private tipService: TipService) {}

  async ngOnInit(): Promise<void> {
    this.combinations$ = this.tipService.getCombinationBets();

    this.tipService.getNumberOfBets(this.userID).subscribe(observer => {
      this.tipsLength = observer
    })

    this.tipService.getStake(this.userID).subscribe(stake => {
      this.stake$ = stake;
    });
  }

  private setStakePerNumber(n: number) {
    this.tipService.setStake(n, this.userID);
  }

  setStake(amount: HTMLInputElement) {
    this.setStakePerNumber(Number(amount.value));
  }
}
