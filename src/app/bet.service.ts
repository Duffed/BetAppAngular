import { Injectable } from '@angular/core';
import { Bet } from 'src/classes/bet';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  bets: Bet[];

  constructor() { 
    //Mock Data
    this.bets = [
      new Bet(1, 100, 1.1),
      new Bet(2, 200, 2.1),
      new Bet(3, 300, 3.1),
      new Bet(4, 400, 1.3),
      new Bet(5, 500, 1.2),
    ];
  }

  getBets(): Bet[] {
    return this.bets;
  }

  getSumOfBetAmount(): number {
    let sumOfBetAmount: number = 0;

    this.bets.forEach(bet => {
      sumOfBetAmount += bet.amount;
    });

    return sumOfBetAmount;
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
