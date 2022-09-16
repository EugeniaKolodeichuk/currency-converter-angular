import { Action } from "@ngrx/store";

export const dailyRatesUpdatedUSD = '[DailyRatesUSD] Updated';
export const dailyRatesUpdateUSD = '[DailyRatesUSD] Update';
export const dailyRatesUpdatedEUR = '[DailyRatesEUR] Updated';
export const dailyRatesUpdateEUR = '[DailyRatesEUR] Update';

export class DailyRatesUpdateUSDAction implements Action {
    type = dailyRatesUpdateUSD;
}

export class DailyRatesUpdatedUSDAction implements Action {
    type = dailyRatesUpdatedUSD;

    constructor(public payload: any) {}
}

export class DailyRatesUpdateEURAction implements Action {
    type = dailyRatesUpdateEUR;
}

export class DailyRatesUpdatedEURAction implements Action {
    type = dailyRatesUpdatedEUR;

    constructor(public payload: any) {}
}