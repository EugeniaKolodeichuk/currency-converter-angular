import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { delay, Observable, tap } from 'rxjs';

import { AmountChangeAction, AmountChangeSuccessAction, GetCurrentDataAction, GetRateByDateAction } from 'src/app/store/actions';

import * as state from '../../store/state';
import * as selectors from'../../store/selectors';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: ConverterComponent,
    },
],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConverterComponent implements OnInit {
  @ViewChild('pickerData') pickerData: ElementRef | undefined;
  
  public amount$: Observable<number> = this.store.select(selectors.getAmountState);
  public currentData$: Observable<any> = this.store.select(selectors.getCurrentData);
  public isLoading$: Observable<boolean> = this.store.select(selectors.isLoading);
  public historicalData$: Observable<any> = this.store.select(selectors.getHistoricalData);
  public currentDate = Date.now();
  public currentRateUSD: number | undefined;
  public currentRateEUR: number | undefined;
  public amountValue: number | undefined;
  public currenciesRates: any;
  public startDate: number = Date.now();
  public datepickerData: number = Date.now();
  public formattedDate: string | undefined;
  
  constructor(
    public store: Store<state.State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentDataAction());
    this.store.dispatch(new GetRateByDateAction());

    this.historicalData$.subscribe((historical) => console.log('history', historical))

    this.getCurrentData();
    this.getAmount();
  }

  public onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new AmountChangeAction(number));
    }
  }

  private getCurrentData() {
    this.currentData$?.pipe(delay(1000)).subscribe((data) => {
      console.log('currentData value', data);
      this.currentRateUSD = parseFloat((1 / data.rates.USD).toFixed(2));
      this.currentRateEUR = parseFloat((1 / data.rates.EUR).toFixed(2));
      this.currenciesRates = Object.keys(data.rates).map((key, index) => {
        return { code: key, value: data.rates[key] };
      });
      
    })
  }

  private getAmount() {
    this.amount$?.pipe(delay(1000)).subscribe((amount) => {
      this.amountValue = amount;
      this.store.dispatch(new AmountChangeSuccessAction());
    })
  }

  public updateRate() {
    this.formattedDate = formatDate(this.datepickerData, 'yyyy-MM-dd', 'en-US');
    console.log('pickerData', this.formattedDate)
  }

  public datepickerOpen() {
    console.log('picker opens!')
  }
}
