import { Injectable } from "@angular/core";
import { Tip } from "src/domain/tip";
import { CombinationBet } from "src/domain/combinationBet";
import { CombinationbetService } from "./combinationbet.service";
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TipService {
  private betsPath = "bets";

  tips = [];
  combinationBets: CombinationBet[] = [];
  stake: number = 100;

  constructor(private combinationBetService: CombinationbetService,
    private firebaseService: FirebaseService,
    private db: AngularFirestore) {
      this.calculateWinnings();
      // console.log(this.getNumberOfTips());

  }

  // async getNumberOfTips(): Promise<number> {
  //   let size = 0;
  //   await this.getTips().toPromise().then(val => {size = val.length} );
  //   return size;
  // }

  // getTips(): Observable<Tip[]> {
  //   return this.db.collection<Tip>(this.betsPath).valueChanges();
  // }

  getTips() {
    return this.db.collection<Tip>(this.betsPath).snapshotChanges().pipe(
        map(changes => {
            return changes.map(doc => {
                return{
                    id: doc.payload.doc.id,
                    opponent1: doc.payload.doc.data().opponent1,
                    opponent2: doc.payload.doc.data().opponent2,
                    date: doc.payload.doc.data().date,
                    odds: doc.payload.doc.data().odds,
                    markedAsWin: doc.payload.doc.data().markedAsWin,
                    sport: doc.payload.doc.data().sport,
                    outcome: doc.payload.doc.data().outcome
                }
            })
        })
    )
  }

  getStake(): number {
    return this.stake;
  }

  setStake(stake: number) {
    this.stake = stake;
    this.calculateWinnings();
  }

  addTip(tip: Tip){
    this.tips.unshift(tip);
    this.firebaseService.addTip(tip);
    this.calculateWinnings();
  }

  removeTip(tip: Tip) {
    this.db.collection("bets").doc(tip.id).delete();
    // this.calculateWinnings();
  }

  getCombinationBets(): CombinationBet[] {
    return this.combinationBets;
  }

  toggleMarkedAsWin(tip: Tip) {
    tip.markedAsWin = !tip.markedAsWin;
    this.db.collection(this.betsPath).doc(tip.id).update({ markedAsWin: tip.markedAsWin });
    this.calculateWinnings();
  }

  private async calculateWinnings() {
    // Trennung falsche und richtige Tips
    let availableCombinationBets = this.combinationBetService.getAvailableCombinationBets(this.tips.length);

    // Calculate single bets when < 3
    if (!availableCombinationBets) {
      this.combinationBets = [];
      return;
    }

    for (const combinationBet of availableCombinationBets) {
      let stakePerBet: number;

      // Single Bets
      if (combinationBet.name === "Single") {
        combinationBet.winnings = -this.stake;
        combinationBet.numberOfBets = this.tips.length;
        stakePerBet = this.stake / combinationBet.numberOfBets;

        this.tips.forEach(tip => {
          if (tip.markedAsWin) combinationBet.winnings += tip.odds * stakePerBet;
        });

        continue;
      }

      // Einsatz pro Wette
      if (!combinationBet.numberOfBets) {
        // Calculate binomial coefficient if not set in CombinationBet
        combinationBet.numberOfBets = this.combinationBetService.binomialCoefficient(this.tips.length, combinationBet.minimumCombinationSize);
      }

      stakePerBet = this.stake / combinationBet.numberOfBets;

      // init winnigs
      let winnings = -this.stake;
      let allBetsForCombinationBet: Tip[][][] = [];

      // Single bets for systembets
      if (combinationBet.minimumCombinationSize <= 1) {
        this.tips.forEach(tip => {
          if (tip.markedAsWin) {
            winnings += stakePerBet * tip.odds;
          }
        });

        combinationBet.minimumCombinationSize++;
      }

      // Alle Wetten sammeln
      for (let i = combinationBet.minimumCombinationSize; i <= combinationBet.maximumCombinationSize; i++) {
        allBetsForCombinationBet.push(this.combinationBetService.getSubsetCombinations(this.tips, i));
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

}
