import {
    Component,
    OnDestroy,
    OnInit,
    LOCALE_ID,
    AfterViewInit,
} from '@angular/core';
import { CommonModule, getCurrencySymbol } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserState } from 'src/app/state/user.state';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { TradeService } from 'src/app/service/trade.service';
import {
    IPendingList,
    ITradeDuration,
} from 'src/app/interface/trade.interface';
import {
    ConfirmDialogComponent,
    ConfirmDialogModel,
} from 'src/app/components/confirm-dialog.component';
import { AlertDialogComponent } from 'src/app/components/alert-dialog.component';

declare const TradingView: any;

@Component({
    selector: 'trade-component',
    standalone: true,
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
    styles: [],
    template: `
        <style>
            .twg {
                background-color: brown;
            }

            table {
                width: 100%;
            }

            table tr td {
                padding: 10px 5px;
            }

            td {
                border-bottom: 1px solid rgba(125, 125, 125, 0.5);
            }

            * {
                color: #ffff;
            }
            .Form {
                min-width: 300px;
                margin: 20px auto;
            }

            mat-form-field {
                width: 100%;
            }

            mat-card-title {
                text-align: center;
                margin: 10px auto 20px;
            }

            mat-card-actions {
                justify-content: center;
            }

            button {
                width: 100%;
                margin: 1px;
                /* padding-left: 3rem;
                padding-right: 3rem; */
            }

            .right-align {
                text-align: right;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
                display: none;
            }
            input.right-align {
                -moz-appearance: textfield;
            }
        </style>

        <section class="my-2">
            <div class="text-center font-bold font-lg">Trade view</div>
        </section>

        <section class="my-2">
            <div class="h-96">
                <div class="tradingview-widget-container">
                    <div id="tradingview_46e39"></div>
                </div>
            </div>
        </section>

        <section class="my-3">
            <form class="Form" [formGroup]="form" (ngSubmit)="onSubmit()">
                <div class="loading-shade" *ngIf="isLoading">
                    <mat-spinner *ngIf="isLoading"></mat-spinner>
                </div>
                <mat-card>
                    <mat-card-title> Get Trade </mat-card-title>
                    <mat-card-content>
                        <div class="flex justify-center">
                            <mat-form-field
                                appearance="outline"
                                hideRequiredMarker
                                floatLabel="always"
                            >
                                <mat-label> Amount </mat-label>
                                <input
                                    class="right-align"
                                    matInput
                                    #amount
                                    min="5"
                                    type="number"
                                    id="amount"
                                    formControlName="amount"
                                    placeholder="Amount"
                                />
                                <span matTextPrefix>$&nbsp;</span>
                                <span matTextSuffix>.00</span>
                            </mat-form-field>
                        </div>

                        <div class="flex justify-center">
                            <mat-form-field
                                appearance="outline"
                                hideRequiredMarker
                            >
                                <mat-label> Slot </mat-label>

                                <mat-select
                                    #trade_duration_id
                                    id="trade_duration_id"
                                    formControlName="trade_duration_id"
                                >
                                    <mat-option
                                        *ngFor="let element of tradeDuration"
                                        [value]="element.id"
                                    >
                                        {{ element.name }}
                                    </mat-option>
                                </mat-select>
                            </mat-form-field>

                            <mat-form-field
                                appearance="outline"
                                hideRequiredMarker
                                floatLabel="always"
                            >
                                <mat-label> Profit percent </mat-label>
                                <input
                                    class="right-align"
                                    matInput
                                    #commission_percent
                                    min="5"
                                    type="number"
                                    id="commission_percent"
                                    formControlName="commission_percent"
                                    placeholder="Profit percent"
                                />
                                <span matTextPrefix>%&nbsp;</span>
                                <span matTextSuffix>.00</span>
                            </mat-form-field>
                        </div>

                        <div class="flex justify-between items-center">
                            <button
                                type="button"
                                mat-raised-button
                                color="primary"
                                [disabled]="!form.valid || !isSubmitBtnEnable"
                                (click)="clickBuy()"
                            >
                                Buy
                            </button>

                            <button
                                type="button"
                                mat-raised-button
                                color="warn"
                                [disabled]="!form.valid || !isSubmitBtnEnable"
                                (click)="clickSell()"
                            >
                                Sell
                            </button>
                        </div>
                    </mat-card-content>
                </mat-card>
            </form>
        </section>

        <section>
            <mat-card>
                <mat-card-title> Running Trade </mat-card-title>
                <mat-card-content>
                    <div
                        *ngFor="let item of ListData"
                        class="px-1 py-1 hover:bg-slate-950 border-b-2 border-slate-300 border-solid"
                    >
                        <div
                            class="flex justify-between items-center px-1 py-1"
                        >
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

                                    <span
                                        class="text-xs font-light px-3 py-1 my-1 rounded bg-blue-900 text-blue-300"
                                    >
                                        ± {{ item.commission | currency }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <div class="text-right my-2">
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
export class TradeComponent implements OnInit, OnDestroy, AfterViewInit {
    form: FormGroup = new FormGroup({});
    isLoading = false;
    isSubmitBtnEnable = true;
    ConfirmDialogState: string = '';

    ListData: IPendingList[] = [];
    tradeDuration: ITradeDuration[] = [];

    constructor(
        public _userState: UserState,
        private fb: FormBuilder,
        private _tradeService: TradeService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            amount: ['100', [Validators.required]],
            direction: ['1', [Validators.required]],
            commission_percent: ['5', [Validators.required]],
            trade_duration_id: ['', [Validators.required]],
        });

        this._tradeService.pendingList().subscribe((result) => {
            this.ListData = result.data;
        });

        this._tradeService.tradeDurationList().subscribe((result) => {
            this.tradeDuration = result.data;
        });
    }

    ngOnDestroy(): void {}

    ngAfterViewInit(): void {
        new TradingView.widget({
            width: '100%',
            height: 380,
            symbol: 'OANDA:XAUUSD',
            interval: 'W',
            timezone: 'Asia/Dhaka',
            theme: 'dark',
            style: '1',
            locale: 'en',
            toolbar_bg: '#f1f3f6',
            enable_publishing: false,
            hide_legend: true,
            save_image: false,
            details: true,
            container_id: 'tradingview_46e39',
        });
    }

    onSubmit() {
        const confirmMessage = `Are you sure you want to do this?`;
        const confirmDialogData = new ConfirmDialogModel(
            'Confirm Action',
            confirmMessage
        );
        const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            minWidth: 300,
            data: confirmDialogData,
        });

        confirmDialogRef.afterClosed().subscribe((dialogResult) => {
            this.ConfirmDialogState = dialogResult;

            if (this.ConfirmDialogState) {
                this.isLoading = true;
                this.isSubmitBtnEnable = false;
                /* this._tradeService.insert(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (res.type == 'success') {
                            this.dialog.open(AlertDialogComponent, {
                                minWidth: 300,
                                data: {
                                    title: 'Success',
                                    type: 'success',
                                    msg: 'Insert Successful',
                                    titleColor: 'green',
                                },
                            });
                        } else {
                            this.dialog.open(AlertDialogComponent, {
                                disableClose: false,
                                minWidth: 300,
                                data: {
                                    title: 'Error',
                                    type: 'error',
                                    msg: 'Insert Faild: ' + res.msg,
                                    titleColor: 'red',
                                },
                            });
                        }
                    },
                    (err) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;
                        console.log(err);
                    }
                ); */
            }
        });
    }

    clickBuy() {
        const confirmMessage = `Buy ${
            this.form.value.amount
        } ${getCurrencySymbol('BDT', 'narrow', 'en')}`;
        const confirmDialogData = new ConfirmDialogModel(
            'Are you sure?',
            confirmMessage
        );
        const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            minWidth: 300,
            data: confirmDialogData,
        });

        confirmDialogRef.afterClosed().subscribe((dialogResult) => {
            this.ConfirmDialogState = dialogResult;

            if (this.ConfirmDialogState) {
                this.isLoading = true;
                this.isSubmitBtnEnable = false;
                this._tradeService.insertBuy(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (res.type == 'success') {
                            this.dialog.open(AlertDialogComponent, {
                                minWidth: 300,
                                data: {
                                    title: 'Success',
                                    type: 'success',
                                    msg: 'Insert Successful',
                                    titleColor: 'green',
                                },
                            });
                            this._tradeService
                                .pendingList()
                                .subscribe((result) => {
                                    this.ListData = result.data;
                                });
                        } else {
                            this.dialog.open(AlertDialogComponent, {
                                disableClose: false,
                                minWidth: 300,
                                data: {
                                    title: 'Error',
                                    type: 'error',
                                    msg: 'Insert Faild: ' + res.msg,
                                    titleColor: 'red',
                                },
                            });
                        }
                    },
                    (err) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;
                        console.log(err);
                    }
                );
            }
        });
    }

    clickSell() {
        const confirmMessage = `Sell ${
            this.form.value.amount
        }${getCurrencySymbol('BDT', 'narrow', 'en')}`;
        const confirmDialogData = new ConfirmDialogModel(
            'Are you sure?',
            confirmMessage
        );
        const confirmDialogRef = this.dialog.open(ConfirmDialogComponent, {
            minWidth: 300,
            data: confirmDialogData,
        });

        confirmDialogRef.afterClosed().subscribe((dialogResult) => {
            this.ConfirmDialogState = dialogResult;

            if (this.ConfirmDialogState) {
                this.isLoading = true;
                this.isSubmitBtnEnable = false;
                this._tradeService.insertSell(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (res.type == 'success') {
                            this.dialog.open(AlertDialogComponent, {
                                minWidth: 300,
                                data: {
                                    title: 'Success',
                                    type: 'success',
                                    msg: 'Insert Successful',
                                    titleColor: 'green',
                                },
                            });
                            this._tradeService
                                .pendingList()
                                .subscribe((result) => {
                                    this.ListData = result.data;
                                });
                        } else {
                            this.dialog.open(AlertDialogComponent, {
                                disableClose: false,
                                minWidth: 300,
                                data: {
                                    title: 'Error',
                                    type: 'error',
                                    msg: 'Insert Faild: ' + res.msg,
                                    titleColor: 'red',
                                },
                            });
                        }
                    },
                    (err) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;
                        console.log(err);
                    }
                );
            }
        });
    }
}
