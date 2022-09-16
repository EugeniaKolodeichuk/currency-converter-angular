import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { ConverterService } from 'src/app/services/converter.service';
import { AmountChangeAction } from 'src/app/store/actions/amount';
import { CurrenciesUpdateAction } from 'src/app/store/actions/currency';
import { GetCurrentDataAction } from 'src/app/store/actions/currentData';
import { DailyRatesUpdateUSDAction, DailyRatesUpdateEURAction } from 'src/app/store/actions/dailyRates';
import { DateUpdateAction, DateUpdatedAction } from 'src/app/store/actions/date';
//import { DateChangeAction } from 'src/app/store/actions/date';

import * as fromRoot from '../../store/reducers';
import * as selectors from'../../store/selectors/currencySelectors';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit {
  public currency$: Observable<any> | undefined;
  public products: any;
  public date: string | undefined;
  public amount$: Observable<number> | undefined;
  public currencyRates$: Observable<any> | undefined;
  public updatedAt$: Observable<any> | undefined;
  public dailyRatesUSD$: Observable<any> | undefined;
  public dailyRatesEUR$: Observable<any> | undefined;
  public currentData$: Observable<any> | undefined;
  public currentDate: string | undefined;
  public currentRateUSD: string | undefined;
  public currentRateEUR: string | undefined;

  constructor(
    private converterService: ConverterService,
    public store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.amount$ = this.store.select(selectors.getAmountState);
    this.currencyRates$ = this.store.select(selectors.getCurrencyRates);
    this.updatedAt$ = this.store.select(selectors.getDate);
    this.dailyRatesUSD$ = this.store.select(selectors.getDailyRatesUSD);
    this.dailyRatesEUR$ = this.store.select(selectors.getDailyRatesEUR);
    this.currentData$ = this.store.select(selectors.getCurrentData)

    this.currentData$.subscribe((data) => {
      console.log('value!!!', data);
      this.currentDate = data.date;
      this.currentRateUSD = (1 / data.rates.USD).toFixed(2);
      this.currentRateEUR = (1 / data.rates.EUR).toFixed(2);
    })
    
    this.store.dispatch(new CurrenciesUpdateAction());
    this.store.dispatch(new DateUpdateAction());
    this.store.dispatch(new DailyRatesUpdateUSDAction());
    this.store.dispatch(new DailyRatesUpdateEURAction());
    this.store.dispatch(new GetCurrentDataAction());

    //for testing API only
    this.loadCurrency()
  }

  public onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new AmountChangeAction(number));
    }
    console.log('number', number)
  }

  private loadCurrency() {
    this.converterService.getAll().subscribe(
      products => {
        this.products = products;
        this.date = products.date;
        console.log('loadCurrency', products)
      }
    )
  }
}
