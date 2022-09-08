import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { CountActions, countActionsType } from "./app.actions";


export const countNode = 'count';

export interface State {
    [countNode]: CountState;
}

export interface CountState {
    count: number;
    updatedAt: number;
}

const initialCountState: CountState = {
    count: 0,
    updatedAt: Date.now()
}

export const countReducer = (state = initialCountState, action: any) => {
    switch (action.type) {
        case countActionsType.increase:
            return {
                ...state,
                count: state.count + 1
            }
        case countActionsType.decrease:
            return {
                ...state,
                count: state.count - 1
            }
        case countActionsType.clear:
            return {
                ...state,
                count: 0
            }
        case countActionsType.updatedAt:
            return {
                ...state,
                updatedAt: action.payload.updatedAt
            }

        default:
            return state;

    }
}

export const reducers: ActionReducerMap<any> = {
    [countNode]: countReducer
}