import { Bet } from './bet';

export interface win { bet: Bet }
export interface loss { bet: Bet }
export type BetResult = win | loss;