import { SportEnum } from "./sport";
import { OutComeEnum } from './outcomeEnum';

export class Tip {
  constructor(
    public opponent1: string,
    public opponent2: string,
    public odds: number,
    public date: firebase.firestore.Timestamp,
    public sport: SportEnum,
    public outcome: OutComeEnum = OutComeEnum.firstFighterWins,
    public markedAsWin: boolean = true
  ) {}
}
