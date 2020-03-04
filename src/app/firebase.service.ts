import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tip } from 'src/domain/tip';
import { map, filter, catchError, mergeMap } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userPath: 'users';
  private betsPath: "bets";

  constructor(private db: AngularFirestore) {

  }

  getTips(): Observable<Tip[]> {
    return this.db.collection<Tip>(this.betsPath).valueChanges();
  }

  addTip(tip: Tip) {
    this.db
      .collection<Tip>(this.betsPath)
      .add({
        opponent1: tip.opponent1,
        opponent2: tip.opponent2,
        odds: tip.odds,
        date: tip.date,
        markedAsWin: tip.markedAsWin,
        outcome: tip.outcome,
        sport: tip.sport
      });
  }
}
