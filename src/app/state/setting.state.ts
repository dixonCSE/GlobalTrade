import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ISetting } from '../interface/setting.interface';
import { SettingService } from '../service/setting.service';

@Injectable({
    providedIn: 'root',
})
export class SettingState {
    public settingState = signal<ISetting[]>([]);
    public settingState$ = toObservable(this.settingState);

    constructor(private _settingService: SettingService) {}

    settingStateLoad() {
        this._settingService.getSettings().subscribe((data) => {
            this.settingState.mutate((value) => {
                value = data;
            });
        });
    }
}
