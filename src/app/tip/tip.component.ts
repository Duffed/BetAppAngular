import { Component, OnInit, Input } from "@angular/core";
import { Tip } from "src/domain/tip";
import { TipService } from "../tip.service";
import { TipListComponent } from '../tip-list/tip-list.component';
import { OutComeLabel } from 'src/domain/outcomeEnum';
import { SportLabel } from 'src/domain/sport';


@Component({
  selector: "tip",
  templateUrl: "./tip.component.html",
  styleUrls: ["./tip.component.scss"]
})
export class TipComponent {
  @Input() tip: Tip;
  @Input() userID: string;

  constructor(private tipService: TipService, private tiplist: TipListComponent) {}

  clickWinToggle(tip) {
    this.tipService.toggleMarkedAsWin(tip, this.userID);
  }

  deleteTip(tip) {
    this.tipService.removeTip(tip, this.userID);
  }

  printOutcome(): string {
    let outcome = OutComeLabel.get(+this.tip.outcome);

    return outcome;
  }

  printDate(): Date {
    return this.tip.date.toDate();
  }

  printSport(): string {
    return SportLabel.get(+this.tip.sport);
  }

  editTip(tip) {
    this.tiplist.editTip(tip);
  }
}
