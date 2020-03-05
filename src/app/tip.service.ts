import { Injectable, OnInit } from "@angular/core";
import { Tip } from "src/domain/tip";
import { CombinationBet } from "src/domain/combinationBet";
import { CombinationbetService } from "./combinationbet.service";
import { FirebaseService } from './firebase.service';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from "rxjs/operators";
import { firestore } from 'firebase/app';


@Injectable({
  providedIn: "root"
})
export class TipService {
  private userID = "kF7jIJWZ5942bGEkaZVN";
  private userPath = "users";
  private betsPath = "bets";
  private stakePath = "stake";
  private numberOfBetsPath = "numberOfBets";
  
  constructor(private combinationBetService: CombinationbetService, private db: AngularFirestore) {  
    this.updateCombinationBets();
  }
  
  getNumberOfBets(): Promise<number> {
    return this.db.collection(this.userPath).doc(this.userID).get().toPromise().then(
      res => res.get(this.numberOfBetsPath)
    );
  }

  private changeBetCounter(n: number) {
    const increment = firestore.FieldValue.increment(n);
    this.db.collection(this.userPath).doc(this.userID).update({ numberOfBets: increment }).catch( e =>
      // create Field if there is none
      this.db.collection(this.userPath).doc(this.userID).set({ numberOfBets: 1})
    )
  }

  private incrementBetCounter() {
    this.changeBetCounter(1);
  }

  private reduceBetCounter() {
    this.changeBetCounter(-1);
  }

  private getBetCollection(): AngularFirestoreCollection<Tip> {
    return this.db.collection(this.userPath).doc(this.userID).collection(this.betsPath);
  }

  private async getTipsOnce(): Promise<Tip[]> {
    let promise = this.getBetCollection().get().pipe(
      map(value => { 
        return value.docs.map(x => <Tip>x.data())
      }) 
    )
  
    return promise.toPromise();
  }

  getTips(): Observable<Tip[]> {
    return this.getBetCollection().snapshotChanges().pipe(
      map(changes => {
          return changes.map(doc => {         
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data();
            return {id, ...data}
          })
      })
    );
  }

  getStake(): Promise<number> {
    return this.db.collection(this.userPath).doc(this.userID).get().toPromise().then(
      res => res.get(this.stakePath)
    );
  }

  setStake(stake: number) {
    this.db.collection(this.userPath).doc(this.userID).update({ stake: stake }).catch( e =>
      // create Field if there is none
      this.db.collection(this.userPath).doc(this.userID).set({ stake: stake})
    )

    this.updateCombinationBets();
  }

  async addTip(tip: Tip){
    this.getBetCollection()
      .add({
        opponent1: tip.opponent1,
        opponent2: tip.opponent2,
        odds: tip.odds,
        date: tip.date,
        markedAsWin: tip.markedAsWin,
        outcome: tip.outcome,
        sport: tip.sport
    });
    this.incrementBetCounter();
   
    this.updateCombinationBets();
  }

  async removeTip(tip) {
    this.getBetCollection().doc(tip.id).delete();
    this.reduceBetCounter();
    
    this.updateCombinationBets();
  }

  async toggleMarkedAsWin(tip) {
    tip.markedAsWin = !tip.markedAsWin;
    this.getBetCollection().doc(tip.id).update({ markedAsWin: tip.markedAsWin });

    this.updateCombinationBets();
  }

  private CombinationBetSubject: Subject<CombinationBet[]> = new Subject()
  
  public getCombinationBets() {
    return this.CombinationBetSubject.asObservable();
  }
  
  private async updateCombinationBets() {
    let combinationBets = await this.calculateCombinationBets();
    this.CombinationBetSubject.next(combinationBets);
    console.log(this.CombinationBetSubject);
    
    this.CombinationBetSubject.complete();
  } 
  
  private async calculateCombinationBets(): Promise<CombinationBet[]> {
    // Trennung falsche und richtige Tips
    const numberOfBets: number = await this.getNumberOfBets();
    const availableCombinationBets = await this.combinationBetService.getAvailableCombinationBets(numberOfBets);
    const stake: number = await this.getStake();
    const tips: Tip[] = await this.getTipsOnce();

    if (!availableCombinationBets) {
      return [];
    }

    for (const combinationBet of availableCombinationBets) {
      let stakePerBet: number;

      // Single Bets
      if (combinationBet.name === "Single") {
        combinationBet.winnings = -stake;
        combinationBet.numberOfBets = numberOfBets;

        stakePerBet = stake / combinationBet.numberOfBets;

        tips.forEach(tip => {
          if (tip.markedAsWin) combinationBet.winnings += tip.odds * stakePerBet;
        });

        continue;
      }

      // Einsatz pro Wette
      if (!combinationBet.numberOfBets) {
        // Calculate binomial coefficient if not set in CombinationBet
        combinationBet.numberOfBets = this.combinationBetService.binomialCoefficient(tips.length, combinationBet.minimumCombinationSize);
      }

      stakePerBet = stake / combinationBet.numberOfBets;

      // init winnigs
      let winnings = -stake;
      let allBetsForCombinationBet: Tip[][][] = [];

      // Single bets for systembets
      if (combinationBet.minimumCombinationSize <= 1) {
        tips.forEach(tip => {
          if (tip.markedAsWin) {
            winnings += stakePerBet * tip.odds;
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
            multiplicator *= tip.odds;
          });
  
          winnings += multiplicator * stakePerBet;
        });
      });
  
      combinationBet.winnings = winnings;
    }

    return availableCombinationBets;
  }
}
