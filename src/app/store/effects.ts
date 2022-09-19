import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, tap } from "rxjs";
import { ConverterService } from "src/app/services/converter.service";
import * as currentData from './actions';
import { GetCurrentDataSuccessAction, GetRateByDateSuccessAction } from "./actions";
import { currencyData } from "src/app/data/mockData";

@Injectable()
export class CurrencyEffects {
    currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.CurrentData),
            map(() => {
                return new GetCurrentDataSuccessAction(currencyData);
            }),
        )
    );

    historicalData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.HistoricalRate),
            switchMap(() =>
                this.currencyService.getDataByDate().pipe(
                    map((data) => new GetRateByDateSuccessAction(data))
                )
            )
        )
    );

    //effect with API-request
    /* currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.CurrentData),
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