import { Injectable } from '@angular/core';
import { Bet } from 'src/domain/bet';
import { BetResult } from 'src/domain/betResult';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  bets: Bet[];

  constructor() { 
    //Mock Data
    this.bets = [
      { id: 1, amount: 100, odds: 1.2 },
      { id: 2, amount: 200, odds: 1.3 },
      { id: 3, amount: 300, odds: 4.3 },
      { id: 4, amount: 400, odds: 2.3 },
      { id: 5, amount: 500, odds: 3.3 }
    ];
  }

  getBets(): Bet[] {
    return this.bets;
  }

  removeBet(bet: Bet) {
    this.bets.splice(this.bets.indexOf(bet), 1);
  }

  //Cartesian product
  // getCartesianProduct(): BetResult[][] {

  // }

}
