import * as date from '../actions/date';

export function reducer(state = [], action: any) {
    switch (action.type) {
        case date.dateUpdated:
            return action.payload;
        default:
            return state;
    }
}