import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _loadUserUrl: string = 'user/api/user_data';
    private _balanceUrl: string = 'user/user/user_balance';
    private _updateUrl: string = 'user/api/update_profile';
    private _referenceDatatabletUrl: string = 'user/api/reference_datatable';
    private _passwordUpdateUrl: string = 'user/api/password_update';

    constructor(public _commonService: CommonService) {
        //
    }

    userData(): Observable<any> {
        return this._commonService.get(this._loadUserUrl);
    }

    userUpdate(reqData: any): Observable<any> {
        return this._commonService.post(this._updateUrl, reqData);
    }

    passwordUpdate(reqData: any): Observable<any> {
        return this._commonService.post(this._passwordUpdateUrl, reqData);
    }

    referenceDatatable(
        search: string | null,
        sort: string,
        order: string,
        offset: number,
        limit: number
    ): Observable<any> {
        let requestUrl = `${this._referenceDatatabletUrl}?search=${search}&sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
        if (search == null) {
            requestUrl = `${this._referenceDatatabletUrl}?sort=${sort}&order=${order}&offset=${offset}&limit=${limit}`;
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

    userBalance(): Observable<any> {
        return this._commonService.get(this._balanceUrl);
    }
}
