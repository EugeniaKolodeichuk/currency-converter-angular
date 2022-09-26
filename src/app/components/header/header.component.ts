import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as state from '../../store/state';
import * as selectors from'../../store/selectors';
import { GetCurrentDataAction, GetRateByDateAction } from 'src/app/store/actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public datepickerData: number = Date.now();
  public currentDate = Date.now();
  public historicalData$: Observable<any> = this.store.select(selectors.getHistoricalData);
  public currentData$: Observable<any> = this.store.select(selectors.getCurrentData);
  

  constructor(
    public store: Store<state.State>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetCurrentDataAction());
  }

  public datepickerOpen() {
    console.log('picker opens!')
  }

  public updateRate() {
    this.store.dispatch(new GetRateByDateAction((formatDate(this.datepickerData, 'yyyy-MM-dd', 'en-US'))))
  }
}
