import { Injectable, signal } from '@angular/core';

import { IBank } from '../interface/bank.interface';
import { BankService } from '../service/bank.service';

@Injectable({
    providedIn: 'root',
})
export class BankState {
    public bankState = signal<IBank | null>(null);

    constructor(private _bankService: BankService) {}

    loadState() {
        this._bankService.getBank().subscribe((res) => {
            this.bankState.set({
                id: res.data.id,
                name: res.data.name,
                image: res.data.image,
                is_withdraw: res.data.is_withdraw,
                is_addfund: res.data.is_addfund,
            });
        });
    }
}
