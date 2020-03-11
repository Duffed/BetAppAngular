import { Component, OnInit, HostBinding, Input } from "@angular/core";
import { Tip, OutComeEnum } from "src/domain/tip";
import { TipService } from "../tip.service";
import { MatDialog } from "@angular/material/dialog";
import { AddTipDialogComponent } from "../add-tip-dialog/add-tip-dialog.component";
import { Sport } from "src/domain/sport";
import { Observable } from 'rxjs';

@Component({
  selector: "tip-list",
  templateUrl: "./tip-list.component.html",
  styleUrls: ["./tip-list.component.scss"]
})
export class TipListComponent implements OnInit {
  @Input() userID: string;
  tipLength: number;
  tips$: Observable<any>;

  constructor(
    private tipService: TipService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.tips$ = this.tipService.getTips(this.userID);
    this.tipService.getNumberOfBets(this.userID).subscribe(observer =>
      this.tipLength = observer);

    this.tipService.updateCombinationBets(this.userID);
  }

  counter(n: number) {
    return new Array(n);
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddTipDialogComponent, {
      maxWidth: "95vw",
      width: "600px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result || !result.submitted) return;

      if (!result.sport) result.sport = Sport.Ufc;
      if (!result.date) result.date = new Date();
      if (!result.outcome) result.outcome = OutComeEnum.firstFighterWins;

      let tip = new Tip(
        result.opponent1,
        result.opponent2,
        result.odds,
        result.date,
        result.sport,
        OutComeEnum[result.outcome]
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

    dialogRef.afterClosed().subscribe(output => {
      if (!output || !output.submitted) return;

      if (!output.sport) output.sport = Sport.Ufc;
      if (!output.date) output.date = new Date();
      if (!output.outcome) output.outcome = OutComeEnum.firstFighterWins;

      tip.opponent1 = output.opponent1;
      tip.opponent2 = output.opponent2;
      tip.odds = output.odds;
      tip.date = output.date;
      tip.sport = output.sport;
      tip.outcome = OutComeEnum[output.outcome];
      debugger;
      this.tipService.updateTip(tip, this.userID);
    });
  }
}
