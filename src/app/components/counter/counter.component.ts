import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { CountClearAction, CountDecreaseAction, CountIncreaseAction } from 'src/app/components/counter/counter-store/app.actions';
import { CountState } from 'src/app/components/counter/counter-store/app.reducers';
import { selectCount, selectUpdatedAd } from 'src/app/components/counter/counter-store/app.selectors';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  public count$: Observable<number> = this.store$.pipe(select(selectCount));
  public updatedAt$: Observable<number> = this.store$.pipe(select(selectUpdatedAd));
  public disableDecrease$: Observable<boolean> = this.count$.pipe(map(count => count <= 0));

  constructor(private store$: Store<CountState>) { }
  
  ngOnInit(): void {
  }

  public increase() {
    this.store$.dispatch(new CountIncreaseAction())
  }

  public decrease () {
    this.store$.dispatch(new CountDecreaseAction())
  }

  public clear() {
    this.store$.dispatch(new CountClearAction())
  }

}
