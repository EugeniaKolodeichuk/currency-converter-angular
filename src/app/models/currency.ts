export interface Currency {
    base: string;
    date: string;
    rates: Rates;
    success: boolean;
    timestamp: number;
}

export interface Rates {
    code: string;
    value: number;
}