import { Component, OnInit, Input } from "@angular/core";
import { Tip } from "src/domain/tip";
import { TipService } from "../tip.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTipDialogComponent } from "../add-tip-dialog/add-tip-dialog.component";
import { SportEnum } from "src/domain/sport";
import { Observable } from 'rxjs';
import { OutComeEnum } from 'src/domain/outcomeEnum';
import * as firebase from 'firebase';
import { trigger, transition, style, group, animate } from '@angular/animations';

@Component({
  selector: "tip-list",
  templateUrl: "./tip-list.component.html",
  styleUrls: ["./tip-list.component.scss"],
  animations: [
    trigger('listItemAnimation', [
      transition(':enter', [
        style({ height: '0px', overflow: 'hidden'}),
        group([animate('250ms ease-out', style({ height:'!' }))])
      ]),
      transition(':leave', [
        style({ height: '!', overflow:'hidden'}),
        group([animate('250ms ease-out', style({ height: '0px' }))])
      ])
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
