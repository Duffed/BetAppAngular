import { Component, OnInit, DoCheck, Input } from "@angular/core";
import { CombinationBet } from "src/domain/combinationBet";
import { TipService } from "../tip.service";
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

    //init field
    let initStake = await this.tipService.getStakeOnce(this.userID);
    this.tipService.stakeSubject.next(initStake);
    
    this.tipService.stakeSubject.asObservable().subscribe(stake => {
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
