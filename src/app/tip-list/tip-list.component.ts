import { Component, OnInit, HostBinding } from "@angular/core";
import { Tip, OutComeEnum } from "src/domain/tip";
import { TipService } from "../tip.service";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { AddTipDialogComponent } from "../add-tip-dialog/add-tip-dialog.component";
import { Sport } from "src/domain/sport";
import { FirebaseService } from '../firebase.service';
import { map, concatMap } from "rxjs/operators";
import { Observable } from 'rxjs';

@Component({
  selector: "tip-list",
  templateUrl: "./tip-list.component.html",
  styleUrls: ["./tip-list.component.scss"]
})
export class TipListComponent implements OnInit {
  tips: Tip[] = [];
  tips$: Observable<any>;

  constructor(
    private tipService: TipService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    // this.tips$ = this.tipService.getTips();
    this.tips$ = this.tipService.getTips();
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
      this.tipService.addTip(tip);
    });
  }
}
