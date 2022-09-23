import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, tap, of, mergeMap, concatMap } from "rxjs";
import { ConverterService } from "src/app/services/converter.service";
import * as currentData from './actions';
import { GetCurrentDataSuccessAction, GetRateByDateSuccessAction, AmountChangeAction, CurrencyChartSuccessAction } from "./actions";
import { Store } from "@ngrx/store";
import { State } from "./state";

@Injectable()
export class CurrencyEffects {

    historicalData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.HistoricalRate),
            switchMap((date) =>
                this.currencyService.getDataByDate(date).pipe(
                    map((data) => new GetRateByDateSuccessAction(data))
                )
            )
        )
    );

    currencyChartData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.CurrencyChart),
            switchMap((payload) =>
                this.currencyService.getDataTimeseries(payload).pipe(
                    map((data) => new CurrencyChartSuccessAction(data))
                )
            )
        )
    );

    currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.CurrentData),
            switchMap(() => {
                return this.currencyService.getAllCurrentData().pipe(
                    map((data) => new GetCurrentDataSuccessAction(data))
                )
            }),
        )
    );
        
    constructor(
        private currencyService: ConverterService,
        private actions$: Actions,
        public store: Store<State>,
    ) {}
}