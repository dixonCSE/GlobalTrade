import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class TradeService {
    private _insertUrl: string = 'user/trade/user_trade_insert';
    private _inserBuytUrl: string = 'user/trade/user_trade_insert_buy';
    private _inserSelltUrl: string = 'user/trade/user_trade_insert_sell';
    private _pendingDatatableUrl: string =
        'user/trade/user_trade_pending_datatable';
    private _pendingListeUrl: string = 'user/trade/pending_list';
    private _completeListeUrl: string = 'user/trade/complete_list';
    private _tradeDurationUrl: string = 'user/trade/trade_duration_list';
    private _completeDatatableUrl: string =
        'user/trade/user_trade_pending_datatable';

    constructor(public _commonService: CommonService) {
        //
    }

    insert(reqData: any): Observable<any> {
        return this._commonService.post(this._insertUrl, reqData);
    }

    insertBuy(reqData: any): Observable<any> {
        return this._commonService.post(this._inserBuytUrl, reqData);
    }

    insertSell(reqData: any): Observable<any> {
        return this._commonService.post(this._inserSelltUrl, reqData);
    }

    completeDatatable(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        return this._commonService.datatable(
            this._completeDatatableUrl,
            search,
            sort,
            order,
            offset,
            limit
        );
    }

    completeList(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        return this._commonService.datatable(
            this._completeListeUrl,
            search,
            sort,
            order,
            offset,
            limit
        );
    }

    pendingDatatable(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        return this._commonService.datatable(
            this._pendingDatatableUrl,
            search,
            sort,
            order,
            offset,
            limit
        );
    }

    pendingList(): Observable<any> {
        return this._commonService.get(this._pendingListeUrl);
    }

    tradeDurationList(): Observable<any> {
        return this._commonService.get(this._tradeDurationUrl);
    }
}
