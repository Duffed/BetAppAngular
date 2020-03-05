import { Injectable } from "@angular/core";
import { CombinationBet } from "src/domain/combinationBet";
import { Tip } from "src/domain/tip";
import { Observable, onErrorResumeNext, of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CombinationbetService {
  SingleBets: CombinationBet[] = [];
  ThreeTipBets: CombinationBet[] = [];
  FourTipBets: CombinationBet[] = [];
  FiveTipBets: CombinationBet[] = [];
  SixTipBets: CombinationBet[] = [];
  SevenTipBets: CombinationBet[] = [];
  EightTipBets: CombinationBet[] = [];

  constructor() {
    this.initCombinationBets();
  }

  getSubsetCombinations(tips: Tip[], size: number) {
    let result = [];

    let recursiveSubset = function(n: number, source: Tip[], got: Tip[], all) {
      if (n === 0) {
        if (got.length > 0) {
          all[all.length] = got;
        }
        return;
      }

      for (let j = 0; j < source.length; j++) {
        if (source[j].markedAsWin)
          recursiveSubset(
            n - 1,
            source.slice(j + 1),
            got.concat([source[j]]),
            all
          );
      }
      return;
    };

    recursiveSubset(size, tips, [], result);

    return result;
  }

  getAvailableCombinationBets(numberOfBets: Observable<number>): Observable<CombinationBet[]> {
    return Observable.create(observer => {
      numberOfBets.subscribe(number => {
        switch (number) {
          case 1: case 2:
            observer.next(this.SingleBets);
          case 3:
            observer.next(this.ThreeTipBets);
          case 4:
            observer.next(this.FourTipBets);
          case 5:
            observer.next(this.FiveTipBets);
          case 6:
            observer.next(this.SixTipBets);
          case 7:
            observer.next(this.SevenTipBets);
          case 8:
            observer.next(this.EightTipBets);
          default:
            observer.complete();
          }    
      });

      observer.complete();
    })
  }

  initCombinationBets() {
    const noSubsets = new CombinationBet("Single", 1, 2);
    const subsetsOfTwo = new CombinationBet("System 2", 2, 2);
    const subsetsOfThree = new CombinationBet("System 3", 3, 3);
    const subsetsOfFour = new CombinationBet("System 4", 4, 4);
    const subsetsOfFive = new CombinationBet("System 5", 5, 5);
    const subsetsOfSix = new CombinationBet("System 6", 6, 6);
    const subsetsOfSeven = new CombinationBet("System 7", 7, 7);
    const trixie = new CombinationBet("System Trixie", 2, 3, 4);
    const patent = new CombinationBet("System Patent", 1, 3, 7);
    const yankee = new CombinationBet("System Yankee", 2, 4, 11);
    const lucky15 = new CombinationBet("System Lucky15", 1, 4, 15);
    const canadian = new CombinationBet("System Canadian", 2, 5, 26);
    const lucky31 = new CombinationBet("System Lucky31", 1, 5, 31);
    const heinz = new CombinationBet("System Heinz", 2, 6, 57);
    const lucky63 = new CombinationBet("System Lucky63", 1, 6, 63);
    const superheinz = new CombinationBet("System Super Heinz", 2, 7, 120);
    const goliath = new CombinationBet("System Goliath", 2, 8, 247);

    this.SingleBets = [noSubsets];
    this.ThreeTipBets = [noSubsets, subsetsOfTwo, trixie, patent];
    this.FourTipBets = [noSubsets, subsetsOfTwo, subsetsOfThree, yankee, lucky15];
    this.FiveTipBets = [
      noSubsets,
      subsetsOfTwo,
      subsetsOfThree,
      subsetsOfFour,
      canadian,
      lucky31
    ];
    this.SixTipBets = [
      noSubsets,
      subsetsOfTwo,
      subsetsOfThree,
      subsetsOfFour,
      subsetsOfFive,
      heinz,
      lucky63
    ];
    this.SevenTipBets = [
      noSubsets,
      subsetsOfTwo,
      subsetsOfThree,
      subsetsOfFour,
      subsetsOfFive,
      subsetsOfSix,
      superheinz
    ];
    this.EightTipBets = [
      noSubsets,
      subsetsOfTwo,
      subsetsOfThree,
      subsetsOfFour,
      subsetsOfFive,
      subsetsOfSix,
      subsetsOfSeven,
      goliath
    ];
  }

  binomialCoefficient(n: number, k: number): number {
    const numerator = this.fact(n);
    const denominator = this.fact(n - k) * this.fact(k);
    return numerator / denominator;
  }

  // Factorial function.
  private fact(x: number): number {
    if (x === 0) {
      return 1;
    }

    return x * this.fact(x - 1);
  }
}
