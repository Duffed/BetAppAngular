import { Component, OnInit } from '@angular/core';
import { Bet } from 'src/domain/bet';
import { BetService } from '../bet.service';

@Component({
  selector: 'app-bet-list',
  templateUrl: './bet-list.component.html',
  styleUrls: ['./bet-list.component.scss']
})
export class BetListComponent implements OnInit {

  bets: Bet[];
  constructor(private betService: BetService) { }

  ngOnInit(): void {
    this.bets = this.betService.getBets();
  }

  getMaximumProfit(): number {
    let maximumProfit: number = 0;

    this.bets.forEach(bet => {
      maximumProfit += (bet.amount * bet.odds);
    });

    return maximumProfit;
  }

  getMaximumLoss(): number {
    let maximumLoss: number = 0;

    this.bets.forEach(bet => {
      maximumLoss -= bet.amount;
    });

    return maximumLoss;
  }

}
