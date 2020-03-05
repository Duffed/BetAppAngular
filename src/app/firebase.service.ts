import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Tip } from 'src/domain/tip';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userPath: 'users';
  private betsPath: "bets";

  constructor(private db: AngularFirestore) {
  }

  getTips(): Observable<Tip[]> {
    return this.db.collection<Tip>(this.betsPath).snapshotChanges().pipe(
      map(changes => {
          return changes.map(doc => {         
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data();
            return {id, ...data}
          })
      })
    );
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
