import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map } from "rxjs";
import { ConverterService } from "src/app/services/converter.service";
import * as currentData from '../actions/currentData';
import { GetCurrentDataSuccessAction } from "../actions/currentData";
import { currencyData } from "src/app/data/mockData";

@Injectable()
export class CurrencyEffects {
    currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.CurrentDataTypes.CurrentData),
            map(() => {
                return new GetCurrentDataSuccessAction(currencyData);
            }),
        )
    );

    //effect with API-request
    /* currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.CurrentDataTypes.CurrentData),
            switchMap(() =>
                this.currencyService.getAllCurrentData().pipe(
                    map((data) => new GetCurrentDataSuccessAction(data))
                )
            )
        )
    ); */
        
    constructor(
        private currencyService: ConverterService,
        private actions$: Actions
    ) {}
}