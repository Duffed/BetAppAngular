import { Sport } from './sport';

export class tip {
    opponents: string[2];
    odds: number;
    date: Date;
    sport: Sport;
    outcome: OutComeEnum = OutComeEnum.firstFighterWins;
}



export enum OutComeEnum {
    firstFighterWins = "Beschreibung",
    secondFighterWins = "Beschreibung",
    firstFighterByKnockoutOrDisqualification = "Beschreibung",
    secondFighterByKnockoutOrDisqualification= "Beschreibung",
    firstFighterByDecision= "Beschreibung",
    secondFighterByDecision= "Beschreibung",
    firstFighterBySubmission= "Beschreibung",
    secondFighterBySubmission= "Beschreibung",
    firstFighterInRound1= "Beschreibung",
    firstFighterInRound2= "Beschreibung",
    firstFighterInRound3= "Beschreibung",
    firstFighterInRound4= "Beschreibung",
    firstFighterInRound5= "Beschreibung",
    secondFighterInRound1= "Beschreibung",
    secondFighterInRound2= "Beschreibung",
    secondFighterInRound3= "Beschreibung",
    secondFighterInRound4= "Beschreibung",
    secondFighterInRound5= "Beschreibung",
    fightLastsMoreThanOneAndHalfRounds= "Beschreibung",
    fightLastsLessThanOneAndHalfRounds= "Beschreibung",
    fightLastsMoreThreeOneAndHalfRounds= "Beschreibung",
    fightLastsLessThreeOneAndHalfRounds= "Beschreibung",
    fightLastsMoreThanFourAndHalfRounds= "Beschreibung",
    fightLastsLessThanFourAndHalfRounds = "Beschreibung"

}