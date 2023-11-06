import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserState } from 'src/app/state/user.state';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import {
    ConfirmDialogComponent,
    ConfirmDialogModel,
} from 'src/app/components/confirm-dialog.component';
import { AlertDialogComponent } from 'src/app/components/alert-dialog.component';
import { TradeService } from 'src/app/service/trade.service';
import { IPendingList } from 'src/app/interface/trade.interface';

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
        </style>

        <section class="my-2">
            <div class="text-center font-bold font-lg">Trade view</div>
        </section>

        <section class="my-2">
            <div class="h-64"></div>
        </section>

        <section class="my-3">
            <form class="Form" [formGroup]="form" (ngSubmit)="onSubmit()">
                <div class="loading-shade" *ngIf="isLoading">
                    <mat-spinner *ngIf="isLoading"></mat-spinner>
                </div>
                <mat-card>
                    <mat-card-title> Get Trade </mat-card-title>
                    <mat-card-content>
                        <div class="grid grid-cols-2 gap-1 place-items-center">
                            <mat-form-field
                                appearance="outline"
                                hideRequiredMarker
                            >
                                <mat-label> Buy / sell </mat-label>
                                <mat-select
                                    #direction
                                    id="direction"
                                    formControlName="direction"
                                >
                                    <mat-option value="1"> Buy </mat-option>
                                    <mat-option value="2"> Sell </mat-option>
                                </mat-select>
                            </mat-form-field>

                            <mat-form-field
                                appearance="outline"
                                hideRequiredMarker
                            >
                                <mat-label> Amount </mat-label>
                                <input
                                    matInput
                                    #amount
                                    type="number"
                                    id="amount"
                                    formControlName="amount"
                                    placeholder="Amount"
                                />
                            </mat-form-field>

                            <div class="col-span-2">
                                <button
                                    type="submit"
                                    mat-raised-button
                                    color="primary"
                                    [disabled]="
                                        !form.valid || !isSubmitBtnEnable
                                    "
                                >
                                    Trade
                                </button>
                            </div>
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
export class TradeComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({});
    isLoading = false;
    isSubmitBtnEnable = true;
    ConfirmDialogState: string = '';

    ListData: IPendingList[] = [];

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
        });

        this._tradeService.pendingList().subscribe((result) => {
            this.ListData = result.data;
        });
    }
    ngOnDestroy(): void {}

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
                this._tradeService.insert(this.form.value).subscribe(
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
                );
            }
        });
    }
}
