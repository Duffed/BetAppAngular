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
  firstFighterWins = "Kämper 1 gewinnt",
  secondFighterWins = "Kämpfer 2 gewinnt",
  firstFighterByKnockoutOrDisqualification = "Kämpfer 1 gewinnt durch KO oder Diqualifikation",
  secondFighterByKnockoutOrDisqualification = "Beschreibung",
  firstFighterByDecision = "Beschreibung",
  secondFighterByDecision = "Beschreibung",
  firstFighterBySubmission = "Beschreibung",
  secondFighterBySubmission = "Beschreibung",
  firstFighterInRound1 = "Beschreibung",
  firstFighterInRound2 = "Beschreibung",
  firstFighterInRound3 = "Beschreibung",
  firstFighterInRound4 = "Beschreibung",
  firstFighterInRound5 = "Beschreibung",
  secondFighterInRound1 = "Beschreibung",
  secondFighterInRound2 = "Beschreibung",
  secondFighterInRound3 = "Beschreibung",
  secondFighterInRound4 = "Beschreibung",
  secondFighterInRound5 = "Beschreibung",
  fightLastsMoreThanOneAndHalfRounds = "Beschreibung",
  fightLastsLessThanOneAndHalfRounds = "Beschreibung",
  fightLastsMoreThreeOneAndHalfRounds = "Beschreibung",
  fightLastsLessThreeOneAndHalfRounds = "Beschreibung",
  fightLastsMoreThanFourAndHalfRounds = "Beschreibung",
  fightLastsLessThanFourAndHalfRounds = "Beschreibung"
}
