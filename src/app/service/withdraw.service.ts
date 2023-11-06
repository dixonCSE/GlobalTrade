import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class WithdrawService {
    private _insertUrl: string = 'user/transaction/withdraw';
    private _datatabletUrl: string = 'user/transaction/withdraw_datatable';

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
        let requestUrl = `${this._datatabletUrl}?search=${search}&sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        if (search == null) {
            requestUrl = `${this._datatabletUrl}?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
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
