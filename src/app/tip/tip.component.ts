import { Component, Input } from "@angular/core";
import { Tip } from "src/app/domain/tip";
import { TipService } from "../services/tip.service";
import { TipListComponent } from '../tip-list/tip-list.component';
import { dynamicOutComeLabel } from 'src/app/domain/outcomeEnum';
import { SportLabel } from 'src/app/domain/sport';

@Component({
  selector: "tip",
  templateUrl: "./tip.component.html",
  styleUrls: ["./tip.component.scss"]
})
export class TipComponent {
  @Input() tip: Tip;
  @Input() userID: string;

  constructor(private tipService: TipService, private tiplist: TipListComponent) {  }

  clickWinToggle(event, tip) {
    this.tipService.toggleMarkedAsWin(tip, this.userID);
  }

  deleteTip(tip) {
    this.tipService.removeTip(tip, this.userID);
  }

  printOutcome(): string {
    return dynamicOutComeLabel(this.tip);
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
