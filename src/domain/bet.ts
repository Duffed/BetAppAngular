import { Sport } from './sport'
import { Url } from 'url'

export class Bet {
    constructor(
        private _id: number,
        private _title: string,
        private _stake: number,
        private _odds: number,
        private _date: Date = new Date(),
        private _sport: Sport = Sport.Ufc,
        private _link?: Url)
    {

    }

    get id() { return this._id }
    get title() { return this._title }
    get stake() { return this._stake }
    get odds() { return this._odds }
    get date() { return this._date }
    get sport() { return this._sport }
    get link() { return this._link }
}
