import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollectionGroup } from 'angularfire2/firestore';
import { Tip } from 'src/domain/tip';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userPath: '/users';
  private betsPath: './bets';

  constructor(private db: AngularFirestore) {
    console.log(
    this.getTips);
  }

  getTips(): Observable<any> {
    return this.db.collection<Tip>('bets').get();
    // tip => { 
    //   return new Tip(tip.get('opponent1'), tip.get('opponent2'), tip.get('odds'), tip.get('date').toDate(), tip.get('sport')); 
    // }

  }

  addTip(tip: Tip) {
    this.db.collection<Tip>('bets').add({
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
