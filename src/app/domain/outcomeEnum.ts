import { Tip } from './tip';

export enum OutComeEnum {
  firstFighterWins = 0,
  secondFighterWins = 1,
  firstFighterByKnockoutOrDisqualification = 2,
  secondFighterByKnockoutOrDisqualification = 3,
  firstFighterByDecision = 4,
  secondFighterByDecision = 5,
  firstFighterBySubmission = 6,
  secondFighterBySubmission = 7,
  firstFighterInRound1 = 8,
  firstFighterInRound2 = 9,
  firstFighterInRound3 = 10,
  firstFighterInRound4 = 11,
  firstFighterInRound5 = 12,
  secondFighterInRound1 = 13,
  secondFighterInRound2 = 14,
  secondFighterInRound3 = 15,
  secondFighterInRound4 = 16,
  secondFighterInRound5 = 17,
  fightLastsMoreThanOneAndHalfRounds = 18,
  fightLastsLessThanOneAndHalfRounds = 19,
  fightLastsMoreThanThreeOneAndHalfRounds = 20,
  fightLastsLessThanThreeOneAndHalfRounds = 21,
  fightLastsMoreThanFourAndHalfRounds = 22,
  fightLastsLessThanFourAndHalfRounds = 23,
}

export const OutComeLabel = new Map<number, string>([
  [OutComeEnum.firstFighterWins, "First Fighter wins"],
  [OutComeEnum.secondFighterWins, "Second Fighter wins"],
  [OutComeEnum.firstFighterByKnockoutOrDisqualification, "First Fighter wins by K.O."],
  [OutComeEnum.secondFighterByKnockoutOrDisqualification, "Second Fighter wins by K.O."],
  [OutComeEnum.firstFighterByDecision, "First Fighter wins by Decision"],
  [OutComeEnum.secondFighterByDecision, "Second Fighter wins by Decision"],
  [OutComeEnum.firstFighterBySubmission, "First Fighter wins by Submission"],
  [OutComeEnum.secondFighterBySubmission, "Second Fighter wins by Submission"],
  [OutComeEnum.firstFighterInRound1, "First Fighter wins in Round 1"],
  [OutComeEnum.firstFighterInRound2, "First Fighter wins in Round 2"],
  [OutComeEnum.firstFighterInRound3, "First Fighter wins in Round 3"],
  [OutComeEnum.firstFighterInRound4, "First Fighter wins in Round 4"],
  [OutComeEnum.firstFighterInRound5, "First Fighter wins in Round 5"],
  [OutComeEnum.secondFighterInRound1, "Second Fighter wins in Round 1"],
  [OutComeEnum.secondFighterInRound2, "Second Fighter wins in Round 2"],
  [OutComeEnum.secondFighterInRound3, "Second Fighter wins in Round 3"],
  [OutComeEnum.secondFighterInRound4, "Second Fighter wins in Round 4"],
  [OutComeEnum.secondFighterInRound5, "Second Fighter wins in Round 5"],
  [OutComeEnum.fightLastsMoreThanOneAndHalfRounds, "Fight lasts more than 1.5 rounds"],
  [OutComeEnum.fightLastsLessThanOneAndHalfRounds, "Fight lasts less than 1.5 rounds"],
  [OutComeEnum.fightLastsMoreThanThreeOneAndHalfRounds, "Fight lasts more than 3.5 rounds"],
  [OutComeEnum.fightLastsLessThanThreeOneAndHalfRounds, "Fight lasts less than 3.5 rounds"],
  [OutComeEnum.fightLastsMoreThanFourAndHalfRounds, "Fight lasts more than 4.5 rounds"],
  [OutComeEnum.fightLastsLessThanFourAndHalfRounds, "Fight lasts less than 4.5 rounds"]
]);

export function dynamicOutComeLabel(tip: Tip): string {
  let output: string;
  switch (tip.outcome) {
    case 0:
      output = tip.opponent1 + " wins";
      break;
    case 1:
      output = tip.opponent2 + " wins";
    break;
    case 2:
      output = tip.opponent1 + " wins by K.O.";
      break;
    case 3:
      output = tip.opponent2 + " wins by K.O.";
      break;
    case 4:
      output = tip.opponent1 + " wins by Decision";
      break;
    case 5:
      output = tip.opponent2 + " wins by Decision";
      break;
    case 6:
      output = tip.opponent1 + " wins by Submission";
      break;
    case 7:
      output = tip.opponent2 + " wins by Submission";
      break;
    case 8:
      output = tip.opponent1 + " wins in Round 1";
      break;
    case 9:
      output = tip.opponent1 + " wins in Round 2";
      break;
    case 10:
      output = tip.opponent1 + " wins in Round 3";
      break;
    case 11:
      output = tip.opponent1 + " wins in Round 4";
      break;
    case 12:
      output = tip.opponent1 + " wins in Round 5";
      break;
    case 13:
      output = tip.opponent2 + " wins in Round 1";
      break;
    case 14:
      output = tip.opponent2 + " wins in Round 2";
      break;
    case 15:
      output = tip.opponent2 + " wins in Round 3";
      break;
    case 16:
      output = tip.opponent2 + " wins in Round 4";
      break;
    case 17:
      output = tip.opponent2 + " wins in Round 5";
      break;
    default:
      output = OutComeLabel.get(tip.outcome);
      break;
  }

  return output;
}