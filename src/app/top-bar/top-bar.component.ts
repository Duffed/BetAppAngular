import { Component, OnInit } from '@angular/core';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(public betService: BetService) { }

  ngOnInit(): void {
  }

  getTotalStake(): number {
    let totalstake: number = 0;

    this.betService.getBets().forEach(bet => {
      totalstake += bet.stake;
    });

    return totalstake;
  }

}
