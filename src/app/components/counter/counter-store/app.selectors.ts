import { createFeatureSelector, createSelector } from "@ngrx/store";
import { countNode, CountState } from "./app.reducers";

export const selectCountFeature = createFeatureSelector<CountState>(countNode);

export const selectCount = createSelector(
    selectCountFeature,
    (state: CountState): number => state.count
)

export const selectUpdatedAd = createSelector(
    selectCountFeature,
    (state: CountState): number => state.updatedAt
)