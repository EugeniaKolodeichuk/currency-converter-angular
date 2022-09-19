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
}

export const initialState: ConverterState = {
    amount: 1,
    currentData: { 
        base: "UAH", 
        date: Date.now().toString(), 
        success: true, 
        timestamp: 1663316343, 
        rates: currencyData.rates,   
    },
    loading: true,
    historicalData: { 
        base: "UAH", 
        date: Date.now().toString(),
        historical: true, 
        success: true, 
        timestamp: 1663316343, 
        rates: currencyData.rates,   
    },
}