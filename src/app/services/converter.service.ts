import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http"
import { delay, map, Observable, of, tap } from "rxjs";
import { currencyData } from "../data/mockData";

@Injectable({
    providedIn: 'root',
})

export class ConverterService {
    

    constructor(
        private http: HttpClient,
    ) { }


    public getAllCurrentData(): Observable<any> {
        return of(currencyData);
        return this.http.get('https://api.exchangeratesapi.io/v1/latest&base=UAH', {
            params: new HttpParams({
                fromObject: {
                    access_key: 'c19a56915081430533df0a783e103977',
                },
            }),
        })
            .pipe(
                delay(200),
                tap((value) => console.log('1', value)),
                map(result => {
                    return result;
                })
            )
    }

    public getDataByDate(date: any): Observable<any> {
        console.log('datee', date.payload)
        return this.http.get(`https://api.apilayer.com/exchangerates_data/${date.payload}`, {
            params: new HttpParams({
                fromObject: {
                    apikey: 'yXfcSc7cJcgHtBUZLMJYv7vMJOTDEtx6',
                    base: 'UAH'
                },
            }),
        })
            .pipe(
                delay(200),
                tap((value) => console.log('2', value)),
                map(result => {
                    return result;
                })
            )
    }

    //todo rewrite dates to dynamic
    public getDataTimeseries(currency: any): Observable<any> {
        return this.http.get(`https://api.apilayer.com/exchangerates_data/timeseries?start_date=2020-01-30&end_date=2020-12-01`, {
            params: new HttpParams({
                fromObject: {
                    apikey: 'yXfcSc7cJcgHtBUZLMJYv7vMJOTDEtx6',
                    base: 'UAH',
                    symbols: currency.payload
                },
            }),
        })
            .pipe(
                delay(200),
                tap((value) => console.log('3', value)),
                map(result => {
                    return result;
                })
            )
    }
}