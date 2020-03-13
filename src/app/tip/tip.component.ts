import { Component, OnInit, Input } from "@angular/core";
import { Tip } from "src/domain/tip";
import { TipService } from "../tip.service";
import { TipListComponent } from '../tip-list/tip-list.component';
import { OutComeLabel } from 'src/domain/outcomeEnum';
import { SportLabel } from 'src/domain/sport';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes'
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: "tip",
  templateUrl: "./tip.component.html",
  styleUrls: ["./tip.component.scss"],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutRight', animate(400, keyframes(kf.slideOutRight)))
    ])
  ]
})
export class TipComponent {
  @Input() tip: Tip;
  @Input() userID: string;
  animationState: string = '';

  constructor(private tipService: TipService, private tiplist: TipListComponent) {}

  async test($event: CdkDrag) {
    // let distance = $event.ended.
    console.log($event);
  }

  startAnimation(state) {
    console.log(state)
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState() {
    if (this.animationState !== '') {
      this.deleteTip(this.tip);
      this.animationState = ''
    }
  }

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
