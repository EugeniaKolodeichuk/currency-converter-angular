import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Currency } from "src/app/models/currency";
import { converterNode, ConverterState } from "./state";

export const selectFeature = createFeatureSelector<ConverterState>(converterNode);

export const amountState = createSelector(selectFeature, (state: ConverterState): number => state.amount);

export const currentData = createSelector(selectFeature, (state: ConverterState): Currency => state.currentData);

export const isLoading = createSelector(selectFeature, (state: ConverterState): boolean => state.loading);

export const historicalData = createSelector(selectFeature, (state: ConverterState): Currency => state.historicalData);

export const savedCurrencies = createSelector(selectFeature, (state: ConverterState): any => state.currencies);

export const currencyChartData = createSelector(selectFeature, (state: ConverterState): any => state.timeseries);

/* ((data) => {
    this.currenciesRates = Object.keys(data?.rates).map((key, index) => {
        return { code: key, value: data.rates[key] };
      });
    }) */