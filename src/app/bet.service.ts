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
      { id: 0, amount: 100, odds: 1.2 },
      { id: 1, amount: 200, odds: 1.3 },
      { id: 1, amount: 300, odds: 4.3 },
      { id: 1, amount: 400, odds: 2.3 },
      { id: 1, amount: 500, odds: 3.3 }
    ];
  }

  getBets(): Bet[] {
    return this.bets;
  }

  //Cartesian product
  // getCartesianProduct(): BetResult[][] {

  // }

}
