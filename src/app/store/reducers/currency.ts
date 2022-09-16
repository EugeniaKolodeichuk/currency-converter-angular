import * as currency from '../actions/currency';

export function reducer(state = [], action: any) {
    console.log('action2', action)
    switch (action.type) {
        case currency.currenciesUpdated:
            console.log('currenciesUpdated', action.payload)
            return action.payload;
        default:
            console.log('updated default')
            return state;
    }
}