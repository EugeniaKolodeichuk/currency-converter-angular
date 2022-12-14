import { currencyData } from "../data/mockData";
import { Currency } from "../models/currency";

export const converterNode = 'count';

export interface State {
    [converterNode]: ConverterState;
}

export interface ConverterState {
    amount: number;
    currentData: Currency;
    loading: boolean;
    historicalData: Currency;
    currencies: any;
    timeseries: any;
    error: string
}

export const initialState: ConverterState = {
    amount: 1,
    currentData: { 
        base: "UAH", 
        date: Date.now().toString(), 
        success: true, 
        timestamp: 1663316343, 
        rates: currencyData?.rates,   
    },
    loading: false,
    historicalData: { 
        base: "UAH", 
        date: Date.now().toString(),
        historical: true, 
        success: true, 
        timestamp: 1663316343, 
        rates: currencyData?.rates,   
    },
    currencies: [],
    timeseries: null,
    error: '',
}