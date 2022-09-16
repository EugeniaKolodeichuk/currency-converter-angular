import { State } from "../reducers";

export const getAmountState = (state: State) => state.amount;
export const getCurrencyRates = (state: State) => state.currencies;
export const getDate = (state: State) => state.date;
export const getDailyRatesUSD = (state: State) => state.dailyRatesUSD;
export const getDailyRatesEUR = (state: State) => state.dailyRatesEUR;
export const getCurrentData = (state: State) => state.currentData;