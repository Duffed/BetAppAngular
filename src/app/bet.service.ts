import { Injectable } from "@angular/core";
import { Bet } from "src/domain/bet";
import { BetResult, ResultType } from "../domain/betResult";

@Injectable({
  providedIn: "root"
})
export class BetService {
  bets: Bet[];

  constructor() {
    // Mock Data
    this.bets = [
      new Bet(1, "Maki Pitolo (USA) - Takashi Sato (JPN)", 5, 2.2),
      new Bet(2, "Angela Hill (USA) - Loma Lookboonmee (THA)", 25, 2.52),
      new Bet(3, "Kai Kara-France (NZL) - Tyson Nam (USA)", 8, 1.2),
      new Bet(4, "Callan Potter (AUS) - Song Kenan (CHN)", 31, 3.2),
      new Bet(5, "Kevin Aguilar (USA) - Zubaira Tukhugov (RUS)", 55, 4.2),
      new Bet(6, "Kevin Aguilar (USA) - Zubaira Tukhugov (RUS)", 55, 4.2),
      new Bet(7, "Kevin Aguilar (USA) - Zubaira Tukhugov (RUS)", 55, 4.2)
    ];
  }

  getBets(): Bet[] {
    return this.bets;
  }

  removeBet(bet: Bet) {
    this.bets.splice(this.bets.indexOf(bet), 1);
  }

  getAllPossibleOutcomes(): BetResult[][] {
    const numberOfBets = this.bets.length;
    const result: BetResult[][] = [];

    for (let i = 0; i < 1 << numberOfBets; i++) {
      const combination: BetResult[] = [];

      // Increasing or decreasing depending on which direction
      // you want your array to represent the binary number
      for (let j = numberOfBets - 1; j >= 0; j--) {
        if (Boolean(i & (1 << j))) {
          combination.push(new BetResult(ResultType.Loss, this.bets[j]));
        } else {
          combination.push(new BetResult(ResultType.Win, this.bets[j]));
        }
      }

      result.push(combination);
    }

    return result;
  }

  getTotalOutcome(betResults: BetResult[]): number {
    let totalOutcome = 0;

    betResults.forEach(result => {
      if (result.result === ResultType.Win) {
        totalOutcome += result.bet.stake * result.bet.odds;
      } else {
        totalOutcome -= result.bet.stake;
      }
    });

    return totalOutcome;
  }
}
