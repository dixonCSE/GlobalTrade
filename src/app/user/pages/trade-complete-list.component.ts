import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material.module';
import { UserState } from 'src/app/state/user.state';
import { ICompleteList } from 'src/app/interface/trade.interface';
import { TradeService } from 'src/app/service/trade.service';

@Component({
    selector: 'trade-complete-list-component',
    standalone: true,
    imports: [CommonModule, MaterialModule, RouterLink],
    styles: [],
    template: `
        <style>
            * {
                color: #ffff;
            }
            mat-card-title {
                text-align: center;
                margin: 10px auto 20px;
            }
        </style>
        <section>
            <mat-card>
                <mat-card-title> Trade Report </mat-card-title>
                <mat-card-content>
                    <div
                        *ngFor="let item of dataList"
                        class="px-1 hover:bg-slate-950 border-b-2 border-slate-300 border-solid"
                    >
                        <div class="flex justify-between items-center px-1 ">
                            <div>
                                <div class="my-2">
                                    <span
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-lime-700 text-blue-300"
                                    >
                                        #{{ item.trade__key }}
                                    </span>
                                </div>
                                <div class="my-2">
                                    <span
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-orange-800 text-blue-300"
                                    >
                                        {{ item.amount | currency }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div class="text-right my-2">
                                    <span
                                        *ngIf="item.res_status__id == 4"
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-blue-900 text-blue-300"
                                    >
                                        + {{ item.commission | currency }}
                                    </span>

                                    <span
                                        *ngIf="item.res_status__id == 5"
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-orange-700 text-blue-300"
                                    >
                                        - {{ item.commission | currency }}
                                    </span>

                                    <span
                                        *ngIf="item.direction == 1"
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-blue-900 text-blue-300"
                                    >
                                        Buy
                                    </span>

                                    <span
                                        *ngIf="item.direction == 2"
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-red-800 text-blue-300"
                                    >
                                        Sell
                                    </span>
                                </div>
                                <div class="my-2">
                                    <span
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-emerald-800 text-blue-300"
                                    >
                                        {{ item.created_date }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </mat-card-content>
            </mat-card>
        </section>
    `,
})
export class TradeCompleteListComponent implements OnInit, OnDestroy {
    dataList: ICompleteList[] = [];

    limit: number = 100;
    offset: number = 0;
    sortCol: string = 'id';
    sortOrder: string = 'desc';
    searchKey: string | null = null;

    isLoading = true;

    constructor(
        public _userState: UserState,
        private _tradeService: TradeService,
        public dialog: MatDialog
    ) {}

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.loadData();
    }

    ngAfterViewInit() {}

    loadData() {
        this._tradeService
            .completeList(
                this.searchKey,
                this.sortCol,
                this.sortOrder,
                this.offset,
                this.limit
            )
            .subscribe((result) => {
                this.dataList = result.data;
                this.isLoading = false;
            });
    }
}
