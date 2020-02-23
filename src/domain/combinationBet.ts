export enum Combination {
    SingleTip,
    TwoBet,
    ThreeBet,
    FourBet,
    FiveBet,
    SixBet,
    SevenBet,
    EightBet
}

export class CombinationBet{
    constructor(
        public name: string,
        public combinations: Combination[]
    ) { }
}

