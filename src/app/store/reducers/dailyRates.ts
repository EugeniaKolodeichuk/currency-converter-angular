import * as dailyRates from '../actions/dailyRates';

export function reducerUSD(state = [], action: any) {
    switch (action.type) {
        case dailyRates.dailyRatesUpdatedUSD:
            return action.payload;
        default:
            return state;
    }
}

export function reducerEUR(state = [], action: any) {
    switch (action.type) {
        case dailyRates.dailyRatesUpdatedEUR:
            return action.payload;
        default:
            return state;
    }
}