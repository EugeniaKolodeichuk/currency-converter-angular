import { Action } from "@ngrx/store";

export const dateUpdated = '[Date] Updated';
export const dateUpdate = '[Date] Update'

export class DateUpdateAction implements Action {
    type = dateUpdate;
}

export class DateUpdatedAction implements Action {
    type = dateUpdated;

    constructor(public payload: any) {}
}