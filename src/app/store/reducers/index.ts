import * as fromAmount from './amount';
import * as fromCurrentData from './currentData'

export const reducers = {
    amount: fromAmount.reducer,
    currentData: fromCurrentData.reducer,
};