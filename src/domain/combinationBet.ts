export class CombinationBet {
  constructor(
    public name: string,
    public minimumCombinationSize: number,
    public maximumCombinationSize: number,
    public numberOfBets?: number,
    public winnings: number = 0,
    public stakePerBet: number = 0
  ) {}
}
