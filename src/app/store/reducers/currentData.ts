import * as currentData from '../actions/currentData';

export function reducer(state = [], action: any) {
    switch (action.type) {
        case currentData.CurrentDataTypes.CurrentDataSuccess:
            return action.payload;
        default:
            return state;
    }
}