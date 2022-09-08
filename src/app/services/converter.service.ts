import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http"
import { catchError, delay, Observable, tap } from "rxjs";





@Injectable({
    providedIn: 'root',
})

export class ConverterService {
    

    constructor(
        private http: HttpClient,
    ) { }

    /* public getAll(): Observable<any> {
        return this.http.get('https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=10',
            )
            .pipe(
                delay(200),
                tap((value) => console.log('value2', value)),
            )
    } */

    /* public getUsers(): Observable<any> {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "XONrbmKhORyRR6fSmIt9pbf5K4tUbiRP");

        var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };
        const url = 'https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=5';

        return this.http.get(url, {params: requestOptions})
     
        let queryParams = new HttpParams();
        const myHeaders = new Headers();
        myHeaders.append("apikey", "XONrbmKhORyRR6fSmIt9pbf5K4tUbiRP"); 

        let queryParams = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        }
       queryParams.append
     
        return this.http.get<any>(url,{params:queryParams});
    } */

    public getAll(): Observable<any> {
        return this.http.get('https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=5', {
            params: new HttpParams({
                fromObject: {
                    apikey: 'k1F6i77IRd5CSPRQZLvmxxcl7tDJq1T1',
                },
            }),
        })
            .pipe(
                delay(200),
                tap((value) => console.log(value))
            )
    }

    /* public getAll(): Observable<any> {
        return this.http.get<any>('https://fakestoreapi.com/products',
            { params: new HttpParams({ fromObject: { limit: 50 } }) })
            .pipe(
                delay(200),
                tap((value) => console.log(value))
            )
    } */
    

    /* public getAll(): Observable<any> {
    const baseUrl = 'https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=5';
        console.log('api calls', baseUrl)
        return this.http.get<any>(baseUrl, {
            params: new HttpParams({
                fromObject: {
                    method: 'GET',
                    redirect: 'follow',
                    access_key: 'XONrbmKhORyRR6fSmIt9pbf5K4tUbiRP'
                },
            }),
        })
            .pipe(
                delay(200),
                tap(() => console.log('work')),
            )
    } */
}