import { Injectable } from '@angular/core';
import { CombinationBet, Combination } from 'src/domain/combinationBet';
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

  private recursiveSubset(n: number, source: any[], got: any[], all) {
    if (n === 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }

    for (let j = 0; j < source.length; j++) {
      this.recursiveSubset(n - 1, source.slice(j + 1), got.concat([source[j]]), all);
    }
    return;
  }

  getSubsetCombinations(input: Tip[], size: number) {
    let result = [];
    this.recursiveSubset(size, input, [], result);
    return result;
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

  initCombinationBets() {
    const subsetsOfTwo = new CombinationBet('2', [Combination.TwoBet]);
    const subsetsOfThree = new CombinationBet('3', [Combination.ThreeBet]);
    const subsetsOfFour = new CombinationBet('4', [Combination.FourBet]);
    const subsetsOfFive = new CombinationBet('5', [Combination.FiveBet]);
    const subsetsOfSix = new CombinationBet('6', [Combination.SixBet]);
    const subsetsOfSeven = new CombinationBet('7', [Combination.SevenBet]);
    const trixie = new CombinationBet('Trixie', [Combination.TwoBet,
      Combination.ThreeBet]);
    const patent = new CombinationBet('Patent', [Combination.SingleTip,
      Combination.TwoBet,
      Combination.ThreeBet]);
    const yankee = new CombinationBet('Yankee', [Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet]);
    const lucky15 = new CombinationBet('Lucky15', [Combination.SingleTip,
      Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet]);
    const canadian = new CombinationBet('Canadian', [Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet,
      Combination.FiveBet]);
    const lucky31 = new CombinationBet('Lucky31', [Combination.SingleTip,
      Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet,
      Combination.FiveBet]);
    const heinz = new CombinationBet('Heinz', [Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet,
      Combination.FiveBet,
      Combination.SixBet]);
    const lucky63 = new CombinationBet('Lucky63', [Combination.SingleTip,
      Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet,
      Combination.FiveBet,
      Combination.SixBet]);
    const superheinz = new CombinationBet('Super Heinz', [Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet,
      Combination.FiveBet,
      Combination.SixBet,
      Combination.SevenBet]);
    const goliath = new CombinationBet('Goliath', [Combination.TwoBet,
      Combination.ThreeBet,
      Combination.FourBet,
      Combination.FiveBet,
      Combination.SixBet,
      Combination.SevenBet,
      Combination.EightBet]);

    this.ThreeTipBets = [subsetsOfTwo, trixie, patent];
    this.FourTipBets =  [subsetsOfTwo, subsetsOfThree, yankee, lucky15];
    this.FiveTipBets =  [subsetsOfTwo, subsetsOfThree, subsetsOfFour, canadian, lucky31];
    this.SixTipBets =   [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, heinz, lucky63];
    this.SevenTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, subsetsOfSix, superheinz];
    this.EightTipBets = [subsetsOfTwo, subsetsOfThree, subsetsOfFour, subsetsOfFive, subsetsOfSix, subsetsOfSeven, goliath];
  }
}