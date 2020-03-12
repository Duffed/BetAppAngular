import { Component, OnInit, HostBinding, Input } from "@angular/core";
import { Tip } from "src/domain/tip";
import { TipService } from "../tip.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTipDialogComponent } from "../add-tip-dialog/add-tip-dialog.component";
import { SportEnum, SportLabel } from "src/domain/sport";
import { Observable } from 'rxjs';
import { OutComeEnum, OutComeLabel } from 'src/domain/outcomeEnum';
import * as firebase from 'firebase';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes'

@Component({
  selector: "tip-list",
  templateUrl: "./tip-list.component.html",
  styleUrls: ["./tip-list.component.scss"],
  animations: [
    trigger('cardAnimator', [
      transition('* => slideOutRight', animate(1000, keyframes(kf.slideOutRight)))
    ])
  ]
})
export class TipListComponent implements OnInit {
  @Input() userID: string;
  tipLength: number;
  tips$: Observable<any>;
  animationState: string;

  constructor(
    private tipService: TipService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.tips$ = this.tipService.getTips(this.userID);
    this.tipService.getNumberOfBets(this.userID)
      .subscribe(observer => this.tipLength = observer);

    this.tipService.updateCombinationBets(this.userID);
  }

  eventText = '';

  onSwipe(evt) {
    console.log(evt);
    
      const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
      const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

      this.eventText += `${x} ${y}<br/>`;
  }

  counter(n: number) {
    return new Array(n);
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddTipDialogComponent, {
      maxWidth: "95vw",
      width: "600px"
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data || !data.submitted) return;
      if (!data.sport) data.sport = SportEnum.Ufc;
      if (!data.outcome) data.outcome = OutComeEnum.firstFighterWins;

      let tip = new Tip(
        data.opponent1,
        data.opponent2,
        Number(data.odds),
        firebase.firestore.Timestamp.fromDate(data.date),
        Number(data.sport),
        Number(data.outcome)
      );

      this.tipService.addTip(tip, this.userID);
    });
  }

  editTip(tip) {
    const dialogRef = this.dialog.open(AddTipDialogComponent, {
      maxWidth: "95vw",
      width: "600px",
      data: tip
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data || !data.submitted) return;
      if (!data.sport) data.sport = SportEnum.Ufc;
      if (!data.outcome) data.outcome = OutComeEnum.firstFighterWins;

      tip.opponent1 = data.opponent1;
      tip.opponent2 = data.opponent2;
      tip.odds = Number(data.odds),
      tip.date = firebase.firestore.Timestamp.fromDate(data.date),
      tip.sport = Number(data.sport),
      tip.outcome = Number(data.outcome)

      this.tipService.updateTip(tip, this.userID);
    });
  }
}
