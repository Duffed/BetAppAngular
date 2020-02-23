import { Injectable } from '@angular/core';
import { Tip, OutComeEnum } from 'src/domain/tip';
import { Sport } from 'src/domain/sport';

@Injectable({
  providedIn: 'root'
})
export class TipService {
  tips: Tip[];

  constructor() {
    this.tips = [
      new Tip('Connor', 'Alex', 3.3, new Date(), Sport.Ufc),
      new Tip('Tobi', 'Markus', 4.3, new Date(), Sport.Ufc),
      new Tip('Kristina', 'Julia', 2.3, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 1.9, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 1.9, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 1.9, new Date(), Sport.Ufc)
    ];
   }

   getTips(): Tip[] {
     return this.tips;
   }

   addTip(tip: Tip) {
     this.tips.push(tip);
   }

   removeTip(tip: Tip) {
     this.tips.splice(this.tips.indexOf(tip), 1);
   }
}
