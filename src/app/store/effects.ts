import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, tap, of, mergeMap, concatMap } from "rxjs";
import { ConverterService } from "src/app/services/converter.service";
import * as currentData from './actions';
import { GetCurrentDataSuccessAction, GetRateByDateSuccessAction, AmountChangeSuccessAction, AmountChangeAction, CurrencyChartSuccessAction } from "./actions";
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
            switchMap((currency) =>
                this.currencyService.getDataTimeseries(currency).pipe(
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
                    map((data) => new GetCurrentDataSuccessAction(data)),
                    tap(() => of(new AmountChangeSuccessAction()))

                    /* mergeMap(() => {
                        return of(new AmountChangeSuccessAction())
                    }) */
                )
            }),
        )
    );

    //added as an example for dispatch at success
    /* restoreClient$: Observable<Action> = this.actions$
        .pipe(
            ofType<action.RestoreClient>(
                action.ActiveClientsActionsTypes.RestoreClient
            ),
            mergeMap(item => {
                item.payload.is_deleted = false;
                return this.patientsService.restoreClient(item.payload.id)
                    .pipe(
                        mergeMap((res: Client) => {
                            return of(new action.RestoreClientSuccess(res));
                        }),
                        catchError(err => {
                            this.snackbarService.error();

                            return of(new action.Error(err))
                        })
                    )
            })
        ); 
        
        loadRateByDate = createEffect(
        () => this.actions.pipe(
            ofType(RateActions.ERateActions.LoadRateByDate),
            switchMap((action: any) => {
                return this.rateService.getRateByDate(action.payload).pipe(
                    map(data => new RateActions.LoadRateByDateSuccess({ data: data })),
                    catchError(error =>
                        of(new RateActions.LoadRateByDateFailure({ error: error }))
                    )
                );
            })
        )
    );*/
        
    constructor(
        private currencyService: ConverterService,
        private actions$: Actions,
        public store: Store<State>,
    ) {}
}