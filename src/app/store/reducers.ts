import { ActionReducerMap } from '@ngrx/store';
import { converterNode, initialState } from './state';
import * as currentData from './actions';

export const converterReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case currentData.ConverterActionsTypes.AmountChange:
            console.log('AmountChange', action.payload)
            return {
                ...state,
                amount: action.payload,
                loading: true,
            }
        case currentData.ConverterActionsTypes.AmountChangeSuccess:
            console.log('end loading')
            return {
                ...state,
                loading: false
            }
        case currentData.ConverterActionsTypes.CurrentData:
            console.log('CurrentData', action.payload)
            return {
                ...state,
                loading: true,
            }
        case currentData.ConverterActionsTypes.CurrentDataSuccess:
            console.log('CurrentDataSuccess', action.payload)
            return {
                ...state,
                currentData: action.payload,
                loading: false,
            }
        case currentData.ConverterActionsTypes.HistoricalRate:
            console.log('HistoricalRate', action.payload)
            return {
                ...state,
                loading: true,
            }
            case currentData.ConverterActionsTypes.HistoricalRateSuccess:
                console.log('HistoricalRateSuccess', action.payload)
                return {
                    ...state,
                    historicalData: action.payload,
                    loading: false,
                }
        default:
            return state;

    }
}

export const reducers: ActionReducerMap<any> = {
    [converterNode]: converterReducer
}