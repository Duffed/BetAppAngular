import { Sport } from "./sport";

export class Tip {
  constructor(
    public opponent1: string,
    public opponent2: string,
    public odds: number,
    public date: Date,
    public sport: Sport,
    public outcome: OutComeEnum = OutComeEnum.firstFighterWins,
    public markedAsWin: boolean = true
  ) {}
}

export enum OutComeEnum {
  firstFighterWins = "First Fighter wins",
  secondFighterWins = "Second Fighter wins",
  firstFighterByKnockoutOrDisqualification = "First Fighter wins by K.O.",
  secondFighterByKnockoutOrDisqualification = "Second Fighter wins by K.O.",
  firstFighterByDecision = "First Fighter wins by Decision",
  secondFighterByDecision = "Second Fighter wins by Decision",
  firstFighterBySubmission = "First Fighter wins by Submission",
  secondFighterBySubmission = "Second Fighter wins by Submission",
  firstFighterInRound1 = "First Fighter wins in Round 1",
  firstFighterInRound2 = "First Fighter wins in Round 2",
  firstFighterInRound3 = "First Fighter wins in Round 3",
  firstFighterInRound4 = "First Fighter wins in Round 4",
  firstFighterInRound5 = "First Fighter wins in Round 5",
  secondFighterInRound1 = "Second Fighter wins in Round 1",
  secondFighterInRound2 = "Second Fighter wins in Round 2",
  secondFighterInRound3 = "Second Fighter wins in Round 3",
  secondFighterInRound4 = "Second Fighter wins in Round 4",
  secondFighterInRound5 = "Second Fighter wins in Round 5",
  fightLastsMoreThanOneAndHalfRounds = "Fight lasts more than 1.5 rounds",
  fightLastsLessThanOneAndHalfRounds = "Fight lasts less than 1.5 rounds",
  fightLastsMoreThanThreeOneAndHalfRounds = "Fight lasts more than 3.5 rounds",
  fightLastsLessThanThreeOneAndHalfRounds = "Fight lasts less than 3.5 rounds",
  fightLastsMoreThanFourAndHalfRounds = "Fight lasts more than 4.5 rounds",
  fightLastsLessThanFourAndHalfRounds = "Fight lasts less than 4.5 rounds"
}
