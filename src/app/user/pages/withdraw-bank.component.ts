import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { UserState } from 'src/app/state/user.state';
import { BalanceState } from 'src/app/state/balance.state';
import { GlobalConstants as gData } from 'src/app/data/global-constants';

import { BankService } from 'src/app/service/bank.service';
import { IBank } from 'src/app/interface/bank.interface';
import { WithdrawComponent } from './withdraw.component';
import { WithdrawDatatableComponent } from './withdraw-datatable.component';

@Component({
    selector: 'withdraw-bank-component',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    styles: [],
    template: `
        <style></style>

        <section class="my-3">
            <mat-card>
                <div class="flex justify-between px-4 py-8 ">
                    <mat-card-title> Available Getway </mat-card-title>
                    <div>
                        <button
                            mat-raised-button
                            color="accent"
                            (click)="loadReport()"
                        >
                            Report
                        </button>
                    </div>
                </div>
            </mat-card>
        </section>

        <section class="my-3">
            <div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                <div
                    class="bg-blue-950 rounded-md p-2 border-2 border-solid border-fuchsia-900"
                    *ngFor="let item of bank"
                >
                    <div class="" (click)="loadComponent(item)">
                        <div class="text-center">
                            <img
                                class="w-15 h-12 p-1 bg-slate-200"
                                src="{{ assetsBase + item.image }}"
                                alt="img"
                            />
                        </div>
                        <div class="text-center">
                            <div class="text-xl font-bold">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="my-3">
            <ng-template wcHost></ng-template>
        </section>
    `,
})
export class WithdrawBankComponent implements OnInit, OnDestroy {
    assetsBase = gData.assetsBaseURL;

    x: any;

    is_vcr_reload: number = 0;

    bank: IBank[] = [];
    constructor(
        public _userState: UserState,
        public _balanceState: BalanceState,
        private _bankService: BankService,
        private _vcr: ViewContainerRef
    ) {}

    ngOnInit(): void {
        this._bankService.withdrawBank().subscribe((result) => {
            this.bank = result.data;
        });
    }

    ngOnDestroy() {}

    loadComponent(item: IBank): void {
        // if (this.vcr_reload(1)) return;

        this._vcr.clear();
        this.x = this._vcr.createComponent(WithdrawComponent);
        this.x.instance.inputbank = item;
    }

    loadReport(): void {
        // if (this.vcr_reload(2)) return;

        this._vcr.clear();
        this.x = this._vcr.createComponent(WithdrawDatatableComponent);
    }

    vcr_reload(id: number): boolean {
        let x: number = this.is_vcr_reload;
        this.is_vcr_reload = id;

        return x == id;
    }
}
