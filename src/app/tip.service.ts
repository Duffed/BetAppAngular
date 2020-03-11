import { Injectable, OnInit, Input } from "@angular/core";
import { Tip } from "src/domain/tip";
import { CombinationBet } from "src/domain/combinationBet";
import { CombinationbetService } from "./combinationbet.service";
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root"
})
export class TipService implements OnInit {
  userIDSubject: Subject<string> = new Subject();
  private userID: string;
  private userPath = "users";
  private betsPath = "bets";
  private stakePath = "stake";
  private CombinationBetSubject: Subject<CombinationBet[]> = new Subject();

  constructor(private combinationBetService: CombinationbetService, private db: AngularFirestore, private auth: AuthService) {
  }

  ngOnInit() {

  }

  getNumberOfBets(userID: string): Observable<number> {
    return this.getBetCollection(userID).snapshotChanges().pipe(map(snapshot => snapshot.length));
  }

  private getBetCollection(userID: string): AngularFirestoreCollection<Tip> {
    return this.db.collection(this.userPath).doc(userID).collection(this.betsPath);
  }

  private async getTipsOnce(userID: string): Promise<Tip[]> {
    let promise = this.getBetCollection(userID).get().pipe(
      map(value => {
        return value.docs.map(x => <Tip>x.data())
      })
    )

    return promise.toPromise();
  }

  getTips(userID: string): Observable<Tip[]> {
    return this.getBetCollection(userID).snapshotChanges().pipe(
      map(changes => {
          return changes.map(doc => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data();
            return {id, ...data}
          })
      })
    );
  }

  getStake(userID: string): Promise<number> {
    return this.db.collection(this.userPath).doc(userID).get().toPromise().then(
      res => res.get(this.stakePath)
    );
  }

  setStake(stake: number, userID: string) {
    this.db.collection(this.userPath).doc(userID).update({ stake: stake }).catch( e =>
      // create Field if there is none
      this.db.collection(this.userPath).doc(userID).set({ stake: stake})
    )

    this.updateCombinationBets(userID);
  }

  async addTip(tip: Tip, userID: string){
    await this.getBetCollection(userID)
      .add({
        opponent1: tip.opponent1,
        opponent2: tip.opponent2,
        odds: tip.odds,
        date: tip.date,
        markedAsWin: tip.markedAsWin,
        outcome: tip.outcome,
        sport: tip.sport
    });

    this.updateCombinationBets(userID);
  }

  async removeTip(tip, userID: string) {
    await this.getBetCollection(userID).doc(tip.id).delete();
    this.updateCombinationBets(userID);
  }

  async updateTip(tip, userID: string) {
    await this.getBetCollection(userID).doc(tip.id).set(tip);
    this.updateCombinationBets(userID);
  }

  async toggleMarkedAsWin(tip, userID: string) {
    tip.markedAsWin = !tip.markedAsWin;
    await this.getBetCollection(userID).doc(tip.id).update({ markedAsWin: tip.markedAsWin });

    this.updateCombinationBets(userID);
  }

  public getCombinationBets() {
    return this.CombinationBetSubject.asObservable();
  }

  async updateCombinationBets(userID) {
    let combinationBets = await this.calculateCombinationBets(userID);
    this.CombinationBetSubject.next(combinationBets);
  }

  private async calculateCombinationBets(userID: string): Promise<CombinationBet[]> {
    // Trennung falsche und richtige Tips
    const tips: Tip[] = await this.getTipsOnce(userID);
    const numberOfTips = tips.length;
    let numberOfBets: number;
    const availableCombinationBets = await this.combinationBetService.getAvailableCombinationBets(numberOfTips);
    const stake: number = await this.getStake(userID);

    if (!availableCombinationBets) {
      return [];
    }

    for (const combinationBet of availableCombinationBets) {
      let stakePerBet: number;

      // Single Bets
      if (combinationBet.name === "Single Bets") {
        combinationBet.winnings = -stake;
        stakePerBet = stake / numberOfTips;
        combinationBet.stakePerBet = stakePerBet;

        tips.forEach(tip => {
          if (tip.markedAsWin)
            combinationBet.winnings += <number>tip.odds * stakePerBet;
        });

        continue;
      }

      // Combination Bets (Alle gewinnen oder verlieren)
      if (combinationBet.name === "Combination") {
        combinationBet.winnings = -stake;
        stakePerBet = stake / numberOfTips;
        combinationBet.stakePerBet = stakePerBet;
        let totalOdds = 1;
        let cbCombWin = true;

        tips.forEach(tip => {
          totalOdds *= tip.odds;
          if (!tip.markedAsWin) cbCombWin = false;
        });

        cbCombWin
          ? (combinationBet.winnings = stake * totalOdds)
          : (combinationBet.winnings = -stake);

        continue;
      }

      // Einsatz pro Wette
      if (!combinationBet.numberOfBets) {
        // Calculate binomial coefficient if not set in CombinationBet
        numberOfBets = this.combinationBetService.binomialCoefficient(numberOfTips, combinationBet.minimumCombinationSize);
      } else {
        numberOfBets = combinationBet.numberOfBets;
      }

      stakePerBet = stake / numberOfBets;
      combinationBet.stakePerBet = stakePerBet;

      // init winnigs
      let winnings = -stake;
      let allBetsForCombinationBet: Tip[][][] = [];

      // Single bets for systembets
      if (combinationBet.minimumCombinationSize <= 1) {
        tips.forEach(tip => {
          if (tip.markedAsWin) {
            winnings += (stakePerBet * <number>tip.odds);
            let a = 5;
          }
        });

        combinationBet.minimumCombinationSize++;
      }

      // Alle Wetten sammeln
      for (let i = combinationBet.minimumCombinationSize; i <= combinationBet.maximumCombinationSize; i++) {
        allBetsForCombinationBet.push(this.combinationBetService.getSubsetCombinations(tips, i));
      }

      // Gewinn berechnen
      allBetsForCombinationBet.forEach(currentArrayOfSubsets => {
        currentArrayOfSubsets.forEach(currentArrayOfBets => {
          let multiplicator = 1;

          currentArrayOfBets.forEach(tip => {
            multiplicator *= <number>tip.odds;
          });

          winnings += multiplicator * stakePerBet;
        });
      });

      combinationBet.winnings = winnings;
    }

    return availableCombinationBets;
  }
}
