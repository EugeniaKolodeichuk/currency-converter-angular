import { Currency } from 'src/app/models/currency';
import * as fromAmount from './amount';
import * as fromCurrency from './currency';
import * as fromDate from './date';
import * as fromDailyRates from './dailyRates';
import * as fromCurrentData from './currentData'

export interface State {
    amount: number;
    currencies: any;
    date: string;
    dailyRatesUSD: number;
    dailyRatesEUR: number;
    currentData: any;
}

export const reducers = {
    amount: fromAmount.reducer,
    currencies: fromCurrency.reducer,
    date: fromDate.reducer,
    dailyRatesUSD: fromDailyRates.reducerUSD,
    dailyRatesEUR: fromDailyRates.reducerEUR,
    currentData: fromCurrentData.reducer,
};