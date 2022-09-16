import { Action } from "@ngrx/store";

export enum CurrentDataTypes {
    CurrentData = '[Data] Current',
    CurrentDataSuccess = '[Data] Current Success',
}

export class GetCurrentDataAction implements Action {
    readonly type = CurrentDataTypes.CurrentData
}

export class GetCurrentDataSuccessAction implements Action {
    readonly type = CurrentDataTypes.CurrentDataSuccess;

    constructor(public payload: any) {}
}

