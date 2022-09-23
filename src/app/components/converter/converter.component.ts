import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { delay, Observable, Subject, takeUntil, tap } from 'rxjs';

import { AddCurrencyAction, AddCurrencySuccessAction, AmountChangeAction, CurrencyChartAction, GetCurrentDataAction, GetRateByDateAction } from 'src/app/store/actions';

import * as state from '../../store/state';
import * as selectors from'../../store/selectors';
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { ConverterService } from 'src/app/services/converter.service';

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
  public currentDate = Date.now();
  public amountValue: number | undefined;
  public currenciesRates: any;
  public datepickerData: number = Date.now();
  public formattedDate: string | undefined;
  private unsubscribe = new Subject<void>();
  public chartCurrency: any;
  public amount$: Observable<number> = this.store.select(selectors.getAmountState);
  public currentData$: Observable<any> = this.store.select(selectors.getCurrentData);
  public isLoading$: Observable<boolean> = this.store.select(selectors.isLoading);
  public historicalData$: Observable<any> = this.store.select(selectors.getHistoricalData);
  public addCurrency$: Observable<any> = this.store.select(selectors.addCurrency);
  public currencyRateData$: Observable<any> = this.store.select(selectors.currencyChartData);

  public lineChartData: ChartConfiguration<'line'>['data'] | any;
  
  constructor(
    public store: Store<state.State>,
    private currencyService: ConverterService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentDataAction());

    this.getCurrentData();
    this.currentAmount();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
}

public currencyForm = new FormGroup({
  start: new FormControl<Date | null>(null),
  end: new FormControl<Date | null>(null),
});

public toppings = this._formBuilder.group({
  pepperoni: false,
  extracheese: false,
  mushroom: false,
});

  public onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new AmountChangeAction(number));
    }
  }

  private getCurrentData() {
    this.currentData$?.pipe(
      delay(1000),
      takeUntil(this.unsubscribe)
    ).subscribe((data) => {
      this.currenciesRates = Object.keys(data.rates).map((key, index) => {
        return { code: key, value: data.rates[key] };
      });
    })
  }

  private currentAmount() {
    this.amount$?.pipe(
      delay(1000),
      takeUntil(this.unsubscribe)
    ).subscribe((amount) => {
        this.amountValue = amount;
      },
    )
  }

  public onAddCurrency(currency: string) {
    this.store.dispatch(new AddCurrencyAction(currency));
    this.store.dispatch(new AddCurrencySuccessAction(currency))
  }

  public updateRate() {
    this.formattedDate = formatDate(this.datepickerData, 'yyyy-MM-dd', 'en-US');
    console.log('pickerData', this.formattedDate)
    this.store.dispatch(new GetRateByDateAction((this.formattedDate)))
    this.historicalData$.pipe(
      takeUntil(this.unsubscribe)
    )
  }

  public datepickerOpen() {
    console.log('picker opens!')
  }

  public onViewChart(currency: string) {
    let formattedStartDate;
    let formattedEndDate;
    const { start, end } = this.currencyForm.value;
    if (start && end) {
      formattedStartDate = formatDate(start, 'yyyy-MM-dd', 'en-US');
      formattedEndDate = formatDate(end, 'yyyy-MM-dd', 'en-US')
      //console.log('start', formattedStartDate, formattedEndDate)
    }

    const payload: any = {
      currency: currency,
      start: formattedStartDate,
      end: formattedEndDate
    };

    let currencyChartData;
    this.store.dispatch(new CurrencyChartAction(payload))
    
    this.currencyRateData$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(
      chartData => {
        currencyChartData = Object.values(chartData.rates).map((value: any) => value[currency])
        this.lineChartData = {
          labels: Object.keys(chartData.rates),
          datasets: [
            {
              data: currencyChartData,
              label: currency,
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            }
          ]
        };
      }
    )
  }
}
