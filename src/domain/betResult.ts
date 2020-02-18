import { Bet } from './bet';

export enum ResultType { Win, Loss }

export class BetResult {
    constructor(public result: ResultType, private _bet: Bet) { }
    get bet() { return this._bet }
}