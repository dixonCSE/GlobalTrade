import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class BankService {
    private _insertUrl: string = 'user/api/bank_insert';
    private _datatabletUrl: string = 'user/api/bank_datatable';
    private _withdrawBanktUrl: string = 'user/user/withdraw_bank';
    private _addfundBanktUrl: string = 'user/user/addfund_bank';
    private _banktUrl: string = 'user/api/bank_list';

    constructor(public _commonService: CommonService) {
        //
    }

    insert(reqData: any): Observable<any> {
        return this._commonService.post(this._insertUrl, reqData);
    }

    withdrawBank(): Observable<any> {
        return this._commonService.get(this._withdrawBanktUrl);
    }

    addfundBank(): Observable<any> {
        return this._commonService.get(this._addfundBanktUrl);
    }

    getBank(): Observable<any> {
        return this._commonService.get(this._banktUrl);
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
