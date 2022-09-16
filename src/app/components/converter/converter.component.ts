import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AmountChangeAction } from 'src/app/store/actions/amount';
import { GetCurrentDataAction } from 'src/app/store/actions/currentData';

import * as fromRoot from '../../store/reducers';
import * as state from '../../store/state';
import * as selectors from'../../store/selectors/currencySelectors';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit {
  public amount$: Observable<number> | undefined;
  public currentData$: Observable<any> | undefined;
  public currentDate = Date.now();
  public currentRateUSD: number | undefined;
  public currentRateEUR: number | undefined;
  public amountValue: number | undefined;
  public currenciesRates: any;
  

  constructor(
    public store$: Store<state.State>
  ) { }

  ngOnInit(): void {
    this.amount$ = this.store$.select(selectors.getAmountState);
    //this.currencyRates$ = this.store.select(selectors.getCurrencyRates);
    this.currentData$ = this.store$.select(selectors.getCurrentData)

    //this.amount$ = this.store$.pipe(select(selectors.getAmountState), tap((value) => console.log('jdhjgfdsh', value)));

    this.currentData$.subscribe((data) => {
      console.log('currentData value', data);
      //this.currentDate = data.date;
      this.currentRateUSD = parseFloat((1 / data.rates.USD).toFixed(2));
      this.currentRateEUR = parseFloat((1 / data.rates.EUR).toFixed(2));
      this.currenciesRates = Object.keys(data.rates).map((key, index) => {
        return { code: key, value: data.rates[key] };
    });
      console.log('currencies rates', this.currenciesRates[0].value)
    })

    this.amount$.subscribe((amount) => {
      this.amountValue = amount;
      console.log('amount', this.amountValue)
    })

    /* this.currencyRates$.subscribe((data) => {
      console.log('currencyRates', data)
    }) */
    
    this.store$.dispatch(new GetCurrentDataAction());
  }

  public onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store$.dispatch(new AmountChangeAction(number));

    }
    console.log('number', number)
  }
}
