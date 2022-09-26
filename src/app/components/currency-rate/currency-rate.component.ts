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

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRateComponent implements OnInit {
  public currentDate = Date.now();
  public currenciesRates: any;
  private unsubscribe = new Subject<void>();
  public amount$: Observable<number> = this.store.select(selectors.getAmountState).pipe(delay(1000));
  public currentData$: Observable<any> = this.store.select(selectors.getCurrentData);
  public allCurrencies: string[];

  constructor(
    public store: Store<state.State>,
  ) {
    
   }

  ngOnInit(): void {

    //todo rewrite to async pipe
    this.getCurrentData()

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allCurrencies.slice())),
    );
  }

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
      this.currenciesRates = Object.keys(data?.rates).map((key, index) => {
        return { code: key, value: data?.rates[key] };
      });
      this.allCurrencies = Object.keys(data?.rates).map((key, index) => key);
      console.log('codes', this.allCurrencies)
    })
  }

  public onAddCurrency(currency: string) {
    this.store.dispatch(new AddCurrencyAction(currency));
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  defaultCurrencies: string[] = ['USD', 'EUR']
  //fruits: string[] = ['Lemon'];
  

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.defaultCurrencies.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.defaultCurrencies.indexOf(fruit);

    if (index >= 0) {
      this.defaultCurrencies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.defaultCurrencies.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCurrencies.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
