import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { GlobalConstants as gData } from '../data/global-constants';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private http: HttpClient, private _router: Router) {
        //
    }

    datatable(
        apiUrl: string,
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        let _apiUrl = gData.apiBaseURL + apiUrl;
        let requestUrl = `${_apiUrl}?search=${search}&sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        if (search == null) {
            requestUrl = `${_apiUrl}?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        }

        return this.http.get<any>(requestUrl).pipe(
            map((resData) => {
                if (resData.logout) {
                    this.userLogout();
                    if (resData.redirect) {
                        this._router.navigate(resData.redirect);
                    } else {
                        this._router.navigate(['/login']);
                    }
                    return false;
                } else {
                    return resData;
                }
            })
        );

        /* return this.http.get<any>(requestUrl, {
            observe: 'response',
        }); */
    }

    post(apiUrl: string, reqData: any): Observable<any> {
        let _apiUrl = gData.apiBaseURL + apiUrl;

        return this.http.post<any>(_apiUrl, reqData).pipe(
            map((resData) => {
                if (resData.logout) {
                    this.userLogout();
                    if (resData.redirect) {
                        this._router.navigate(resData.redirect);
                    } else {
                        this._router.navigate(['/login']);
                    }
                    return false;
                } else {
                    return resData;
                }
            })
        );
    }

    get(apiUrl: string): Observable<any> {
        let _apiUrl = gData.apiBaseURL + apiUrl;
        return this.http.get<any>(_apiUrl).pipe(
            map((resData) => {
                if (resData.logout) {
                    this.userLogout();
                    if (resData.redirect) {
                        this._router.navigate(resData.redirect);
                    } else {
                        this._router.navigate(['/login']);
                    }
                    return false;
                } else {
                    return resData;
                }
            })
        );
    }

    userLogout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('role');
        this._router.navigate(['/']);
    }
}
