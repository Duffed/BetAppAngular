import { Injectable } from "@angular/core";
import { Tip } from "src/domain/tip";
import { CombinationBet } from "src/domain/combinationBet";
import { CombinationbetService } from "./combinationbet.service";
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs';
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
  private numberOfBets: number;

  tips = [];
  stake: Observable<number>;

  constructor(private combinationBetService: CombinationbetService,
    private db: AngularFirestore) {
      this.getNumberOfBets().subscribe(value => this.numberOfBets = value);
  }
  
  getNumberOfBets(): Observable<number> {
    return this.db.collection(this.userPath).doc(this.userID).snapshotChanges().pipe(
      map(values => { return values.payload.get(this.numberOfBetsPath) })
    )
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

  getStake(): Observable<number> {
    return this.db.collection(this.userPath).doc(this.userID).snapshotChanges().pipe(
      map(changes => {
        return changes.payload.get(this.stakePath);
      })
    )
  }

  setStake(stake: number) {
    this.db.collection(this.userPath).doc(this.userID).update({ stake: stake }).catch( e =>
      // create Field if there is none
      this.db.collection(this.userPath).doc(this.userID).set({ stake: stake})
    )
  }

  addTip(tip: Tip){
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
  }

  removeTip(tip) {
    this.getBetCollection().doc(tip.id).delete();
    this.reduceBetCounter();
    this.getCombinationBets();
  }

  toggleMarkedAsWin(tip) {
    tip.markedAsWin = !tip.markedAsWin;
    this.getCombinationBets();
    this.getBetCollection().doc(tip.id).update({ markedAsWin: tip.markedAsWin });
  }

  getCombinationBets(): Promise<CombinationBet[]> {
    // Trennung falsche und richtige Tips
    return new Promise<CombinationBet[]>(resolve => {
      let promise = this.combinationBetService.getAvailableCombinationBets(this.getNumberOfBets()); 
      promise.toPromise().then(availableCombinationBets => {
    
          if (!availableCombinationBets) {
            resolve(null);
            return;
          }

          for (const combinationBet of availableCombinationBets) {
            let stakePerBet: number;
      
            // Single Bets
            if (combinationBet.name === "Single") {
              combinationBet.winnings = -this.stake;
              combinationBet.numberOfBets = this.tips.length;

              this.stake.toPromise().then(stake => {
                stakePerBet = stake / combinationBet.numberOfBets;
              })
      
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

            this.stake.toPromise().then(stake => {
              stakePerBet = stake / combinationBet.numberOfBets;
            })
      
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

          resolve(availableCombinationBets);
        })
      })
  }
}
