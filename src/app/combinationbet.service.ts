import { Injectable } from '@angular/core';
import { CombinationBet } from 'src/domain/combinationBet';

@Injectable({
  providedIn: 'root'
})
export class CombinationbetService {
  ThreeTipBets: CombinationBet[] = [];
  FourTipBets: CombinationBet[] = [];
  FiveTipBets: CombinationBet[] = [];
  SixTipBets: CombinationBet[] = [];
  SevenTipBets: CombinationBet[] = [];
  EightTipBets: CombinationBet[] = [];

  constructor() { 
    this.initCombinationBets() 
  }

  getSystemCombinations(numberOfTips: number): CombinationBet[] {
    switch (numberOfTips) {
      case 3:
        return this.ThreeTipBets;
      case 4:
        return this.FourTipBets;
      case 5:
        return this.FiveTipBets;
      case 6:
        return this.SixTipBets;
      case 7:
        return this.SevenTipBets;
      case 8:
          return this.EightTipBets;
      default:
        return null;
    }
  }

  initCombinationBets(){
    let subsetsOfTwo = new CombinationBet("2", false, true, false, false, false, false, false, false);
    let subsetsOfThree = new CombinationBet("3", false, false, true, false, false, false, false, false);
    let subsetsOfFour = new CombinationBet("4", false, false, false, true, false, false, false, false);
    let subsetsOfFive = new CombinationBet("5", false, false, false, false, true, false, false, false);
    let subsetsOfSix = new CombinationBet("6", false, false, false, false, false, true, false, false);
    let subsetsOfSeven = new CombinationBet("7", false, false, false, false, false, false, true, false);
    let trixie = new CombinationBet("Trixie", false, true, true, false, false, false, false, false);
    let patent = new CombinationBet("Patent", true, true, true, false, false, false, false, false);
    let yankee = new CombinationBet("Yankee", false, true, true, true, false, false, false, false);
    let lucky15 = new CombinationBet("Lucky15", true, true, true, true, false, false, false, false);
    let canadian = new CombinationBet("Canadian", false, true, true, true, true, false, false, false);
    let lucky31 = new CombinationBet("Lucky31", true, true, true, true, true, false, false, false);
    let heinz = new CombinationBet("Heinz", false, true, true, true, true, true, false, false);
    let lucky63 = new CombinationBet("Lucky63", true, true, true, true, true, true, false, false);
    let superheinz = new CombinationBet("Super Heinz", false, true, true, true, true, true, true, false);
    let goliath = new CombinationBet("Goliath", false, true, true, true, true, true, true, true);


    this.ThreeTipBets = [subsetsOfTwo, trixie, patent];
    this.FourTipBets = [subsetsOfTwo, subsetsOfThree, yankee, lucky15];
    this.FiveTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, canadian, lucky31];
    this.SixTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, heinz, lucky63];
    this.SevenTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, subsetsOfSix, superheinz];
    this.EightTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, subsetsOfSix, subsetsOfSeven, goliath];
  }
}