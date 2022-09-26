import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, tap, of, mergeMap, concatMap, catchError } from "rxjs";
import { ConverterService } from "src/app/services/converter.service";
import * as currentData from './actions';
import { GetCurrentDataSuccessAction, GetRateByDateSuccessAction, AmountChangeAction, CurrencyChartSuccessAction, ErrorAction } from "./actions";
import { Store } from "@ngrx/store";
import { State } from "./state";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class CurrencyEffects {

    historicalData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.HistoricalRate),
            switchMap((date) =>
                this.currencyService.getDataByDate(date).pipe(
                    map((data) => new GetRateByDateSuccessAction(data)),
                    catchError(err => {
                        this.snackBar.open('Rate Updating Failed', 'Close');
                        return of(new ErrorAction(err));
                    })
                )
            )
        )
    );

    currencyChartData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.CurrencyChart),
            switchMap((payload) =>
                this.currencyService.getDataTimeseries(payload).pipe(
                    map((data) => new CurrencyChartSuccessAction(data)),
                    catchError(err => {
                        this.snackBar.open('Currency Chart Failed', 'Close');
                        return of(new ErrorAction(err));
                    })
                )
            )
        )
    );

    currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.ConverterActionsTypes.CurrentData),
            switchMap(() => {
                return this.currencyService.getAllCurrentData().pipe(
                    map((data) => new GetCurrentDataSuccessAction(data)),
                    catchError(err => {
                        this.snackBar.open('Currency Data Request Failed', 'Close');
                        return of(new ErrorAction(err));
                    })
                )
            }),
        )
    );
        
    constructor(
        private currencyService: ConverterService,
        private actions$: Actions,
        public store: Store<State>,
        private snackBar: MatSnackBar,
    ) {}
}