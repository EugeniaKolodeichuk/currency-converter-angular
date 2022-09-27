import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as state from '../../store/state';
import * as selectors from'../../store/selectors';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
  public addCurrency$: Observable<any> = this.store.select(selectors.savedCurrencies);
  public isLoading$: Observable<boolean> = this.store.select(selectors.isLoading);

  
  constructor(
    public store: Store<state.State>,
  ) { }
}
