import { Component, OnInit } from '@angular/core';
import { Tip, OutComeEnum } from 'src/domain/tip';
import { TipService } from '../tip.service';
import { CombinationBet } from 'src/domain/combinationBet';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddTipDialogComponent } from '../add-tip-dialog/add-tip-dialog.component';
import { Sport } from 'src/domain/sport';

@Component({
  selector: 'app-tip-list',
  templateUrl: './tip-list.component.html',
  styleUrls: ['./tip-list.component.scss']
})
export class TipListComponent implements OnInit {
  tips: Tip[];

  constructor(private tipService: TipService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.tips = this.tipService.getTips();
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(AddTipDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result.submitted) return;

      if (!result.sport) result.sport = Sport.Ufc;
      if (!result.date) result.date = new Date();
      if (!result.outcome) result.outcome = OutComeEnum.firstFighterWins;

      let tip = new Tip(result.opponent1, result.opponent2, result.odds, result.date, result.sport, result.outcome);
      this.tipService.addTip(tip);
    })
  }

}
