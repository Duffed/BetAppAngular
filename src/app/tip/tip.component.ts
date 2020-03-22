import { Component, OnInit, Input } from "@angular/core";
import { Tip } from "src/domain/tip";
import { TipService } from "../tip.service";
import { TipListComponent } from '../tip-list/tip-list.component';
import { dynamicOutComeLabel } from 'src/domain/outcomeEnum';
import { SportLabel } from 'src/domain/sport';

@Component({
  selector: "tip",
  templateUrl: "./tip.component.html",
  styleUrls: ["./tip.component.scss"]
})
export class TipComponent {
  @Input() tip: Tip;
  @Input() userID: string;
  animationState: string = '';

  constructor(private tipService: TipService, private tiplist: TipListComponent) {
  }

  clickWinToggle(event, tip) {
    event.stopPropagation();
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
