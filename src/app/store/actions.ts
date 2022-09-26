import { Action } from "@ngrx/store";

export enum ConverterActionsTypes {
    CurrentData = '[Data] Current',
    CurrentDataSuccess = '[Data] Current Success',
    AmountChange = '[Amount] Change',
    AmountChangeSuccess = '[Amount] Change Success',
    HistoricalRate = '[Rate] Historical',
    HistoricalRateSuccess = '[Rate] Historical Success',
    AddCurrency = '[Currency] Add',
    AddCurrencySuccess = '[Currency] Add Success',
    CurrencyChart = '[Currency] Chart',
    CurrencyChartSuccess = '[Currency] Chart Success',
    Error = '[Error] Currency Data Error',
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

export class GetRateByDateAction implements Action {
    readonly type = ConverterActionsTypes.HistoricalRate;

    constructor(public payload: any) {}
}

export class GetRateByDateSuccessAction implements Action {
    readonly type = ConverterActionsTypes.HistoricalRateSuccess;

    constructor(public payload: any) {}
}

export class AddCurrencyAction implements Action {
    readonly type = ConverterActionsTypes.AddCurrency;

    constructor(public payload: any) {}
}

export class CurrencyChartAction implements Action {
    readonly type = ConverterActionsTypes.CurrencyChart;

    constructor(public payload: any) {}
}

export class CurrencyChartSuccessAction implements Action {
    readonly type = ConverterActionsTypes.CurrencyChartSuccess;

    constructor(public payload: any) {}
}

export class ErrorAction implements Action {
    readonly type = ConverterActionsTypes.Error;

    constructor(public payload: any) {}
}