import { Injectable } from '@angular/core';
import { Tip, OutComeEnum } from 'src/domain/tip';
import { Sport } from 'src/domain/sport';
import { CombinationBet } from 'src/domain/combinationBet';
import { CombinationbetService } from './combinationbet.service';

@Injectable({
  providedIn: 'root'
})
export class TipService {
  tips: Tip[];

  constructor(private combinationBetService: CombinationbetService) {
    this.tips = [
      new Tip('Connor', 'Alex', 2.8, new Date(), Sport.Ufc),
      new Tip('Tobi', 'Markus', 2.0, new Date(), Sport.Ufc),
      new Tip('Kristina', 'Julia', 1.7, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 1.62, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 1.9, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 2.1, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 1.7, new Date(), Sport.Ufc),
      new Tip('Leo', 'Thomas', 2.2, new Date(), Sport.Ufc),
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

   calculateWinnings(tips: Tip[], stake: number): CombinationBet[]{
    // Trennung falsche und richtige Tips
    let availableCombinationBets =  this.combinationBetService.getAvailableCombinationBets(tips.length);
      for (const combinationBet of availableCombinationBets) {
  
        // Einsatz pro Wette
        let stakePerBet: number;
        if(combinationBet.numberOfBets){
          stakePerBet = stake/combinationBet.numberOfBets;
        } else{
          stakePerBet = stake/this.combinationBetService.getNumberOfBets(tips.length, combinationBet.minimumCombinationSize);
        }

        // init winnigs
        let winnings = -stake;
  
        // Alle Wetten sammeln
        let allBetsForCombinationBet: Tip[][][] = [];
        if (combinationBet.minimumCombinationSize <= 1) {
          tips.forEach(tip => {
            winnings += (stakePerBet * tip.odds)
          });

          combinationBet.minimumCombinationSize++;
        }

        for (let i = combinationBet.minimumCombinationSize; i <= combinationBet.maximumCombinationSize; i++) {
          allBetsForCombinationBet.push(this.combinationBetService.getSubsetCombinations(tips,i));
        }
  
        // Gewinn berechnen
        // allBetsForCombinationBet.forEach(currentArrayOfSubsets => {
        //   array.forEach(element => {
            
        //   });
        // });

        for (let j = 0; j < allBetsForCombinationBet.length; j++) {
          let currentArrayOfSubsets = allBetsForCombinationBet[j];
          
          for (let k = 0; k < currentArrayOfSubsets.length; k++) {
            let currentArrayOfBets = currentArrayOfSubsets[k];
            let multiplicator = 1;
            
            for (let l = 0; l < currentArrayOfBets.length; l++) {
              multiplicator *= currentArrayOfBets[l].odds;
            }

            winnings += multiplicator * stakePerBet;
          }
        }
  
        combinationBet.winnings = winnings;
      }
      return availableCombinationBets;
  }
}
