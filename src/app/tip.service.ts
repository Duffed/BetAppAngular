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
export class TipService implements OnInit {
  private userID = "kF7jIJWZ5942bGEkaZVN";
  private userPath = "users";
  private betsPath = "bets";
  private stakePath = "stake";
  private numberOfBetsPath = "numberOfBets";  
  private CombinationBetSubject: Subject<CombinationBet[]> = new Subject();;
  
  
  constructor(private combinationBetService: CombinationbetService, private db: AngularFirestore) {  
    this.updateCombinationBets();
  }
  
  async ngOnInit(): Promise<void> {
    // let combinationBets = await this.calculateCombinationBets();
  }
  
  getNumberOfBets(): Observable<number> {
    return this.getBetCollection().get().pipe(map(snapshot => snapshot.size));
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
    await this.getBetCollection()
      .add({
        opponent1: tip.opponent1,
        opponent2: tip.opponent2,
        odds: tip.odds,
        date: tip.date,
        markedAsWin: tip.markedAsWin,
        outcome: tip.outcome,
        sport: tip.sport
    });
    
    this.updateCombinationBets();
  }

  async removeTip(tip) {
    await this.getBetCollection().doc(tip.id).delete();
    this.updateCombinationBets();
  }

  async toggleMarkedAsWin(tip) {
    tip.markedAsWin = !tip.markedAsWin;
    await this.getBetCollection().doc(tip.id).update({ markedAsWin: tip.markedAsWin });

    this.updateCombinationBets();
  }
  
  public getCombinationBets() {
    return this.CombinationBetSubject.asObservable();
  }
  
  private async updateCombinationBets() {
    let combinationBets = await this.calculateCombinationBets();
    this.CombinationBetSubject.next(combinationBets);
  } 
  
  private async calculateCombinationBets(): Promise<CombinationBet[]> {
    // Trennung falsche und richtige Tips
    const tips: Tip[] = await this.getTipsOnce();
    const numberOfTips = tips.length;
    let numberOfBets: number;
    const availableCombinationBets = await this.combinationBetService.getAvailableCombinationBets(numberOfTips);
    const stake: number = await this.getStake();

    if (!availableCombinationBets) {
      return [];
    }

    for (const combinationBet of availableCombinationBets) {
      let stakePerBet: number;

      // Single Bets
      if (combinationBet.name === "Single") {
        combinationBet.winnings = -stake;
        stakePerBet = stake / numberOfTips;
        combinationBet.stakePerBet = stakePerBet;

        tips.forEach(tip => {
          if (tip.markedAsWin) combinationBet.winnings += (<number>tip.odds * stakePerBet);
        });

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
