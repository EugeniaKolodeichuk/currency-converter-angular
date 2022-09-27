import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as state from '../../store/state';
import * as selectors from'../../store/selectors';
import { delay, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { AddCurrencyAction, AmountChangeAction } from 'src/app/store/actions';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { currencyData } from 'src/app/data/mockData';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRateComponent implements OnInit {
  @ViewChild('currencyInput')
  currencyInput!: ElementRef<HTMLInputElement>;

  public currentDate = Date.now();
  public currenciesRates: any;
  public amount$: Observable<number> = this.store.select(selectors.amountState).pipe(delay(1000));
  public currentData$: Observable<any> = this.store.select(selectors.currentData);
  public allCurrencies: string[] = Object.keys(currencyData.rates).map((key, index) => {return key});
  public filteredCurrencies!: Observable<string[]>;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public currencyControl = new FormControl('');
  public selectedCurrencies: string[] = ['USD', 'EUR'];
  public showRates: boolean = false;
  
  constructor(
    public store: Store<state.State>,
  ) { }

  ngOnInit(): void {
    this.filterCurrencies();
  }

  public filterCurrencies() {
    this.filteredCurrencies = this.currencyControl.valueChanges.pipe(
      startWith(null),
      map((currency: string | null) => (currency ? this._filter(currency) : this.allCurrencies.slice())),
    );
  }

  public onAmountChange(amount: string) {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new AmountChangeAction(number));
    }
  }

  public onAddCurrency(currency: string) {
    this.store.dispatch(new AddCurrencyAction(currency));
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedCurrencies.push(value);
    }

    event.chipInput!.clear();

    this.currencyControl.setValue(null);
  }

  public remove(currency: string): void {
    const index = this.selectedCurrencies.indexOf(currency);

    if (index >= 0) {
      this.selectedCurrencies.splice(index, 1);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedCurrencies.push(event.option.viewValue);
    this.currencyInput.nativeElement.value = '';
    this.currencyControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCurrencies.filter(currency => currency.toLowerCase().includes(filterValue));
  }
}
