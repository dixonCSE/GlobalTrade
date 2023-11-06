import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    private _insertUrl: string = 'user/transaction/send';
    private _receiveListUrl: string = 'user/transaction/receive_datatable';
    private _sendListUrl: string = 'user/transaction/send_datatable';

    constructor(public _commonService: CommonService) {
        //
    }

    insert(reqData: any): Observable<any> {
        return this._commonService.post(this._insertUrl, reqData);
    }

    receiveDatatable(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        let requestUrl = `${this._receiveListUrl}?search=${search}&sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        if (search == null) {
            requestUrl = `${this._receiveListUrl}?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
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

    sendDatatable(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        return this._commonService.datatable(
            this._sendListUrl,
            search,
            sort,
            order,
            offset,
            limit
        );
    }
}
