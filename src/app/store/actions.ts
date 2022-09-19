import { Action } from "@ngrx/store";

export enum ConverterActionsTypes {
    CurrentData = '[Data] Current',
    CurrentDataSuccess = '[Data] Current Success',
    AmountChange = '[Amount] Change',
    AmountChangeSuccess = '[Amount] Change Success',
    HistoricalRate = '[Rate] Historical',
    HistoricalRateSuccess = '[Rate] Historical Success',
}

export class GetCurrentDataAction implements Action {
    readonly type = ConverterActionsTypes.CurrentData;
}

export class GetCurrentDataSuccessAction implements Action {
    readonly type = ConverterActionsTypes.CurrentDataSuccess;

    constructor(public payload: any) {}
}

export class AmountChangeAction implements Action {
    readonly type = ConverterActionsTypes.AmountChange;

    constructor(public payload: number) {}
}

export class AmountChangeSuccessAction implements Action {
    readonly type = ConverterActionsTypes.AmountChangeSuccess;
}

export class GetRateByDateAction implements Action {
    readonly type = ConverterActionsTypes.HistoricalRate;
}

export class GetRateByDateSuccessAction implements Action {
    readonly type = ConverterActionsTypes.HistoricalRateSuccess;

    constructor(public payload: any) {}
}