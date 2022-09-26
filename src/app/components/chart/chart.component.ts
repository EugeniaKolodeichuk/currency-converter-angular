import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CurrencyChartAction } from 'src/app/store/actions';
import * as state from '../../store/state';
import * as selectors from'../../store/selectors';
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() savedCurrencies: any;
  
  public chartCurrency: any;
  private unsubscribe = new Subject<void>();
  public lineChartData: ChartConfiguration<'line'>['data'] | any;
  public currencyRateData$: Observable<any> = this.store.select(selectors.currencyChartData);

  constructor(
    public store: Store<state.State>,
  ) { }

  ngOnInit(): void {
  }

  public currencyForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    date: new FormControl<Date | null>(null)
  });

  public onViewChart(currency: string) {
    const { start, end } = this.currencyForm.value;
    if (!start || !end) return;

    const payload: any = {
      currency,
      start: formatDate(start, 'yyyy-MM-dd', 'en-US'),
      end: formatDate(end, 'yyyy-MM-dd', 'en-US')
    };

    this.store.dispatch(new CurrencyChartAction(payload))
    
    this.currencyRateData$.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(
      chartData => {
        const currencyChartData = Object.values(chartData?.rates).map((value: any) => 1 / Number(value[currency]))
        this.lineChartData = {
          labels: Object.keys(chartData?.rates),
          datasets: [
            {
              data: currencyChartData,
              label: currency,
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(2,142,545,0.3)'
            }
          ]
        };
      }
    )
  }
}
