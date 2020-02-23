import { Injectable } from '@angular/core';
import { CombinationBet } from 'src/domain/combinationBet';
import { Tip } from 'src/domain/tip';

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

  getSubsetCombinations(tips: Tip[], size:number) {
    let result = [];

    let recursiveSubset = function(n: number, source: Tip[], got: Tip[], all) {

      if (n == 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }
      
      for (var j = 0; j < source.length; j++) {
        if (source[j].markedAsWin)
            recursiveSubset(n - 1, source.slice(j + 1), got.concat([source[j]]), all);
      }
      return;
    }

    recursiveSubset(size, tips, [], result);

    return result;
  }

  getAvailableCombinationBets(numberOfTips: number): CombinationBet[] {
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

  initCombinationBets() {
    let subsetsOfTwo = new CombinationBet("2", 2, 2);
    let subsetsOfThree = new CombinationBet("3", 3,3);
    let subsetsOfFour = new CombinationBet("4", 4,4);
    let subsetsOfFive = new CombinationBet("5", 5,5);
    let subsetsOfSix = new CombinationBet("6", 6,6);
    let subsetsOfSeven = new CombinationBet("7", 7,7);
    let trixie = new CombinationBet("Trixie", 2,3, 4);
    let patent = new CombinationBet("Patent", 1,3, 7);
    let yankee = new CombinationBet("Yankee", 2,4, 11);
    let lucky15 = new CombinationBet("Lucky15", 1,4, 15);
    let canadian = new CombinationBet("Canadian", 2,5, 26);
    let lucky31 = new CombinationBet("Lucky31", 1,5, 31);
    let heinz = new CombinationBet("Heinz", 2,6, 57);
    let lucky63 = new CombinationBet("Lucky63", 1,6, 63);
    let superheinz = new CombinationBet("Super Heinz", 2,7, 120);
    let goliath = new CombinationBet("Goliath", 2,8, 247);

    this.ThreeTipBets = [subsetsOfTwo, trixie, patent];
    this.FourTipBets =  [subsetsOfTwo, subsetsOfThree, yankee, lucky15];
    this.FiveTipBets =  [subsetsOfTwo, subsetsOfThree, subsetsOfFour, canadian, lucky31];
    this.SixTipBets =   [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, heinz, lucky63];
    this.SevenTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, subsetsOfSix, superheinz];
    this.EightTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, subsetsOfSix, subsetsOfSeven, goliath];
  }


   // Returned die Anzahl der Wetten für die 2er, 3er .... 7er wetten
   getNumberOfBets(numberOfTips: number, subsetsSize: number): number {
    switch (numberOfTips) {
      case 3:
        switch (+subsetsSize) {
          case 2:
            return 3;
        }
      case 4:
        switch (+subsetsSize) {
          case 2:
            return 6;
          case 3:
            return 4;
        }
      case 5:
        switch (+subsetsSize) {
          case 2:
            return 10;
          case 3:
            return 10;
          case 4:
            return 5;
        }
      case 6:
        switch (+subsetsSize) {
          case 2:
            return 15;
          case 3:
            return 20;
          case 4:
            return 15;
          case 5:
            return 6;
        }
      case 7:
        switch (+subsetsSize) {
          case 2:
            return 21;
          case 3:
            return 35;
          case 4:
            return 35;
          case 5:
            return 21;
          case 6:
            return 7;
        }
      case 8:
        switch (+subsetsSize) {
          case 2:
            return 28;
          case 3:
            return 56;
          case 4:
            return 70;
          case 5:
            return 56;
          case 6:
            return 28;
          case 7:
            return 8;
        }

    }
  }
}