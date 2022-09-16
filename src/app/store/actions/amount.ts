import { Action } from "@ngrx/store";

export const amountChange = '[Amount] Change';

export class AmountChangeAction implements Action {
    type = amountChange;

    constructor(public payload: number) {}
}