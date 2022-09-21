import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Currency } from "src/app/models/currency";
import { converterNode, ConverterState } from "./state";

export const selectFeature = createFeatureSelector<ConverterState>(converterNode);

export const getAmountState = createSelector(selectFeature, (state: ConverterState): number => state.amount);

export const getCurrentData = createSelector(selectFeature, (state: ConverterState): Currency => state.currentData);

export const isLoading = createSelector(selectFeature, (state: ConverterState): boolean => state.loading);

export const getHistoricalData = createSelector(selectFeature, (state: ConverterState): Currency => state.historicalData);

export const addCurrency = createSelector(selectFeature, (state: ConverterState): any => state.currencies);

export const currencyChartData = createSelector(selectFeature, (state: ConverterState): any => state.timeseries);