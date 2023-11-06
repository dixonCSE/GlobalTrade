import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    constructor(public _commonService: CommonService) {}

    getSettings(): Observable<any> {
        let api_url: string = 'setting';
        return this._commonService.get(api_url);
    }
}
