import { Injectable } from "@angular/core";
import { Tip, OutComeEnum } from "src/domain/tip";
import { Sport } from "src/domain/sport";
import { CombinationBet } from "src/domain/combinationBet";
import { CombinationbetService } from "./combinationbet.service";

@Injectable({
  providedIn: "root"
})
export class TipService {
  tips: Tip[];
  combinationBets: CombinationBet[] = [];
  stake: number = 100;

  constructor(private combinationBetService: CombinationbetService) {
    this.tips = [
      new Tip("Connor", "Alex", 2.8, new Date(), Sport.Ufc),
      new Tip("Tobi", "Markus", 2.0, new Date(), Sport.Ufc),
      new Tip("Kristina", "Julia", 1.7, new Date(), Sport.Ufc),
      new Tip("Leo", "Thomas", 1.62, new Date(), Sport.Ufc),
      new Tip("Leo", "Thomas", 1.9, new Date(), Sport.Ufc),
      new Tip("Leo", "Thomas", 2.1, new Date(), Sport.Ufc)
    ];

    this.calculateWinnings();
  }

  getTips(): Tip[] {
    return this.tips;
  }

  getStake(): number {
    return this.stake;
  }

  setStake(stake: number) {
    this.stake = stake;
    this.calculateWinnings();
  }

  addTip(tip: Tip) {
    this.tips.unshift(tip);
    this.calculateWinnings();
  }

  removeTip(tip: Tip) {
    this.tips.splice(this.tips.indexOf(tip), 1);
    this.calculateWinnings();
  }

  getCombinationBets(): CombinationBet[] {
    return this.combinationBets;
  }

  toggleMarkedAsWin(tip: Tip) {
    let index = this.tips.indexOf(tip);
    this.tips[index].markedAsWin = !this.tips[index].markedAsWin;
    this.calculateWinnings();
  }

  private calculateWinnings() {
    // Trennung falsche und richtige Tips
    this.combinationBets = [];
    let availableCombinationBets = this.combinationBetService.getAvailableCombinationBets(this.tips.length);

    // Calculate single bets when < 3
    if (!availableCombinationBets) {
      this.calculateSingleBets();
      return;
    }

    for (const combinationBet of availableCombinationBets) {
      // Einsatz pro Wette
      let stakePerBet: number;
      if (combinationBet.numberOfBets) {
        stakePerBet = this.stake / combinationBet.numberOfBets;
      } else {
        stakePerBet = this.stake / this.combinationBetService.binomialCoefficient(this.tips.length, combinationBet.minimumCombinationSize);
      }

      // init winnigs
      let winnings = -this.stake;
      let allBetsForCombinationBet: Tip[][][] = [];

      // Einzelwetten
      if (combinationBet.minimumCombinationSize <= 1) {
        this.tips.forEach(tip => {
          if (tip.markedAsWin) {
            winnings += stakePerBet * tip.odds;
          }
        });

        combinationBet.minimumCombinationSize++;
      }

      // Alle Wetten sammeln
      for (
        let i = combinationBet.minimumCombinationSize;
        i <= combinationBet.maximumCombinationSize;
        i++
      ) {
        allBetsForCombinationBet.push(
          this.combinationBetService.getSubsetCombinations(this.tips, i)
        );
      }

      // Gewinn berechnen
      allBetsForCombinationBet.forEach(currentArrayOfSubsets => {
        currentArrayOfSubsets.forEach(currentArrayOfBets => {
          let multiplicator = 1;

          currentArrayOfBets.forEach(tip => {
            multiplicator *= tip.odds;
          });

          winnings += multiplicator * stakePerBet;
        });
      });

      combinationBet.winnings = winnings;
    }

    this.combinationBets = availableCombinationBets;
  }

  private calculateSingleBets() {
    let combinationBet = new CombinationBet("Single", 1, 2);

    combinationBet.winnings = - this.stake;
    let stakePerBet = this.stake / this.tips.length;

    this.tips.forEach(tip => {
      if (tip.markedAsWin)
        combinationBet.winnings += (tip.odds * stakePerBet)
    });

    this.combinationBets.unshift(combinationBet);
  }
}
