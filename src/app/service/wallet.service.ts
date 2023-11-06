import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class WalletService {
    private _datatabletUrl: string = 'user/user/wallet_datatable';
    private _withdrawWalletUrl: string = 'user/user/withdraw_wallet';
    private _sendWalletUrl: string = 'user/user/send_wallet';
    private _exchangeWalletUrl: string = 'user/user/exchange_wallet';
    private _walletUrl: string = 'user/user/wallet_list';

    constructor(public _commonService: CommonService) {
        //
    }

    withdrawWallet(): Observable<any> {
        return this._commonService.get(this._withdrawWalletUrl);
    }

    sendWallet(): Observable<any> {
        return this._commonService.get(this._sendWalletUrl);
    }

    exchangeWallet(): Observable<any> {
        return this._commonService.get(this._exchangeWalletUrl);
    }

    getWallet(): Observable<any> {
        return this._commonService.get(this._walletUrl);
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
