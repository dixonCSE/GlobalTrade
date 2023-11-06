import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class ExchangeService {
    private _insertUrl: string = 'user/transaction/exchange_insert';
    private _datatableUrl: string = 'user/transaction/exchange_datatable';

    constructor(public _commonService: CommonService) {
        //
    }

    insert(reqData: any): Observable<any> {
        return this._commonService.post(this._insertUrl, reqData);
    }

    datatable(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        let requestUrl = `${this._datatableUrl}?search=${search}&sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        if (search == null) {
            requestUrl = `${this._datatableUrl}?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        }

        return this._commonService.datatable(
            requestUrl,
            search,
            sort,
            order,
            offset,
            limit
        );
    }
}
