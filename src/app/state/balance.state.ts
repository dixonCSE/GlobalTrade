import { Injectable, signal } from '@angular/core';
import { UserService } from '../service/user.service';
import { IBalanceState, IUserBalance } from '../interface/wallet.interface';

@Injectable({
    providedIn: 'root',
})
export class BalanceState {
    public state = signal<IBalanceState | null>(null);
    tmp: IBalanceState | null = null;

    constructor(private _userService: UserService) {}

    loadState() {
        this.loadReq();
        setInterval(() => {
            this.loadReq();
        }, 60000);
    }

    loadReq() {
        this._userService.userBalance().subscribe((res) => {
            for (const key in res.data) {
                this.tmp = {
                    ...this.tmp,
                    [key]: res.data[key],
                };
            }
            this.state.set(this.tmp);
            //console.log(this.state()?.['user_bonus'].value);
        });
    }
}
