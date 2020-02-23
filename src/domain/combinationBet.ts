import { BetService } from 'src/app/bet.service'

export class CombinationBet{
    constructor(
        public name: string,
        public singleTip: boolean,
        public twoBetCombinations: boolean,
        public threeBetCombinations: boolean,
        public fourBetCombinations: boolean,
        public fiveBetCombinations: boolean,
        public sixBetCombinations: boolean,
        public sevenBetCombinations: boolean,
        public eightBetCombinations: boolean
    ) 
    { }
}

