import { Sport } from "./sport";
import { OutComeEnum } from './outcomeEnum';

export class Tip {
  constructor(
    public opponent1: string,
    public opponent2: string,
    public odds: number,
    public date: any,
    public sport: Sport,
    public outcome: OutComeEnum = OutComeEnum.firstFighterWins,
    public markedAsWin: boolean = true
  ) {}
}
