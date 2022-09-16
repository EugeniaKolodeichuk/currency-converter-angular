import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../state";

export const selectFeature = createFeatureSelector<any>('selector');

/* export const getAmountState = createSelector(
    selectFeature,
    (state: State): number => state.amount
) */

/* export const selectUpdatedAd = createSelector(
    selectCountFeature,
    (state: CountState): number => state.updatedAt
) */

export const getAmountState = (state: State) => state.amount;
export const getCurrentData = (state: State) => state.currentData;