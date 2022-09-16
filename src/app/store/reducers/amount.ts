import * as amount from '../actions/amount';

export function reducer(state: number = 1, action: any) {
    console.log('action1', action)
    switch (action.type) {
        case amount.amountChange:
            console.log('action payload', action.payload)
            return action.payload;
        default:
            console.log('amount default')
            return state;
    }
}