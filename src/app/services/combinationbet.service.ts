import { Injectable } from "@angular/core";
import { CombinationBet } from "src/app/domain/combinationBet";
import { Tip } from "src/app/domain/tip";
import { Observable, onErrorResumeNext, of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CombinationbetService {
  noSubsets = new CombinationBet("Single Bets", 1, 2);
  combination = new CombinationBet("Combination", 2, 8);
  subsetsOfTwo = new CombinationBet("System 2", 2, 2);
  subsetsOfThree = new CombinationBet("System 3", 3, 3);
  subsetsOfFour = new CombinationBet("System 4", 4, 4);
  subsetsOfFive = new CombinationBet("System 5", 5, 5);
  subsetsOfSix = new CombinationBet("System 6", 6, 6);
  subsetsOfSeven = new CombinationBet("System 7", 7, 7);
  trixie = new CombinationBet("System Trixie", 2, 3, 4);
  patent = new CombinationBet("System Patent", 1, 3, 7);
  yankee = new CombinationBet("System Yankee", 2, 4, 11);
  lucky15 = new CombinationBet("System Lucky15", 1, 4, 15);
  canadian = new CombinationBet("System Canadian", 2, 5, 26);
  lucky31 = new CombinationBet("System Lucky31", 1, 5, 31);
  heinz = new CombinationBet("System Heinz", 2, 6, 57);
  lucky63 = new CombinationBet("System Lucky63", 1, 6, 63);
  superheinz = new CombinationBet("System Super Heinz", 2, 7, 120);
  goliath = new CombinationBet("System Goliath", 2, 8, 247);

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

  async getAvailableCombinationBets(numberOfBetsInput: number): Promise<CombinationBet[]> {
    const numberOfBets = await numberOfBetsInput;
    let availableCombinationBets: CombinationBet[] = [];

    switch (numberOfBets) {
      case 1:
        availableCombinationBets.push(this.noSubsets);
        break;
      case 2:
        availableCombinationBets.push(this.noSubsets, this.combination);
        break;
      case 3:
        availableCombinationBets.push(this.noSubsets,
          this.combination,
          this.subsetsOfTwo,
          this.trixie,
          this.patent);
        break;
      case 4:
        availableCombinationBets.push(this.noSubsets,
          this.combination,
          this.subsetsOfTwo,
          this.subsetsOfThree,
          this.yankee,
          this.lucky15);
        break;
      case 5:
        availableCombinationBets.push(this.noSubsets,
          this.combination,
          this.subsetsOfTwo,
          this.subsetsOfThree,
          this.subsetsOfFour,
          this.canadian,
          this.lucky31);
        break;
      case 6:
        availableCombinationBets.push(this.noSubsets,
          this.combination,
          this.subsetsOfTwo,
          this.subsetsOfThree,
          this.subsetsOfFour,
          this.subsetsOfFive,
          this.heinz,
          this.lucky63);
        break;
      case 7:
        availableCombinationBets.push(this.noSubsets,
          this.combination,
          this.subsetsOfTwo,
          this.subsetsOfThree,
          this.subsetsOfFour,
          this.subsetsOfFive,
          this.subsetsOfSix,
          this.superheinz);
        break;
      case 8:
        availableCombinationBets.push(this.noSubsets,
          this.combination,
          this.subsetsOfTwo,
          this.subsetsOfThree,
          this.subsetsOfFour,
          this.subsetsOfFive,
          this.subsetsOfSix,
          this.subsetsOfSeven,
          this.goliath);
        break;
      default:
        break;
    }

    return availableCombinationBets;
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
