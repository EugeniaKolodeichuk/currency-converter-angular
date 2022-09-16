import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { catchError, delay, map, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class ConverterService {
    

    constructor(
        private http: HttpClient,
    ) { }


    public getAll(): Observable<any> {
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
}