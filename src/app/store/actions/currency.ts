import { Action } from "@ngrx/store";
import { Currency } from "src/app/models/currency";

export const currenciesUpdate = '[Currency] UpdateAll';
export const currenciesUpdated = '[Currency] UpdatedAll';

export class CurrenciesUpdateAction implements Action {
    type = currenciesUpdate;
}

export class CurrenciesUpdatedAction implements Action {
    type = currenciesUpdated;

    constructor(public payload: any) {}
}