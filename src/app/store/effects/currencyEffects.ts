import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, switchMap, map, tap } from "rxjs";
import { Currency } from "src/app/models/currency";
import { ConverterService } from "src/app/services/converter.service";

import * as currency from '../actions/currency';
import * as date from '../actions/date';
import * as dailyRates from '../actions/dailyRates';
import * as currentData from '../actions/currentData'
import { CurrenciesUpdatedAction } from "../actions/currency";
import { DateUpdatedAction } from "../actions/date";
import { DailyRatesUpdatedEURAction, DailyRatesUpdatedUSDAction } from "../actions/dailyRates";
import { GetCurrentDataSuccessAction } from "../actions/currentData";

@Injectable()
export class CurrencyEffects {
    currencyDate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(date.dateUpdate),
            switchMap(() =>
                this.currencyService.getAll().pipe(
                    map((data) => new DateUpdatedAction(data.date))
                )
            )
        )
    );

  dailyRatesUSD$ = createEffect(() =>
    this.actions$.pipe(
        ofType(dailyRates.dailyRatesUpdateUSD),
        switchMap(() =>
            this.currencyService.getAll().pipe(
                map((date) => new DailyRatesUpdatedUSDAction(date.rates)),
                map((date) => new DailyRatesUpdatedUSDAction(date.payload['USD']))
            )
        )
    )
  );

  dailyRatesEUR$ = createEffect(() =>
    this.actions$.pipe(
        ofType(dailyRates.dailyRatesUpdateEUR),
        switchMap(() =>
            this.currencyService.getAll().pipe(
                //tap((value) => {console.log('value55555', value.rates.EUR)}),
                map((date) => new DailyRatesUpdatedEURAction(date.rates.EUR)),
                //map((date) => new DailyRatesUpdatedEURAction(date.payload['EUR']))
            )
        )
    )
  );

  currentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(currentData.CurrentDataTypes.CurrentData),
            switchMap(() =>
                this.currencyService.getAll().pipe(
                    map((data) => new GetCurrentDataSuccessAction(data))
                )
            )
        )
    );

    /* @Effect()
    update$: Observable<any> = this.actions$.pipe(
        ofType(currency.currenciesUpdate),
        switchMap(() =>
            this.currencyService.getAll().pipe(
                tap((value) => {console.log('value', value.rates)}),
                //map((data: Currency) => new CurrenciesUpdatedAction(data.date)),
                map((date) => new DateUpdatedAction(date.date))
            )
        )
    ) */
        
    constructor(
        private currencyService: ConverterService,
        private actions$: Actions
    ) {}
}