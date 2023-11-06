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
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
    ConfirmDialogComponent,
    ConfirmDialogModel,
} from 'src/app/components/confirm-dialog.component';
import { AlertDialogComponent } from 'src/app/components/alert-dialog.component';
import { TransactionService } from 'src/app/service/transaction.service';
import { IWallet } from 'src/app/interface/wallet.interface';
import { WalletService } from 'src/app/service/wallet.service';

@Component({
    selector: 'send-component',
    standalone: true,
    imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterLink],
    styles: [],
    template: `
        <style>
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
        <form class="Form" [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="loading-shade" *ngIf="isLoading">
                <mat-spinner *ngIf="isLoading"></mat-spinner>
            </div>
            <mat-card>
                <mat-card-title> Send </mat-card-title>
                <mat-card-content>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Receiver ID </mat-label>
                            <input
                                matInput
                                #ReceiverId
                                id="ReceiverId"
                                formControlName="ReceiverId"
                                placeholder="Receiver ID"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Wallet </mat-label>

                            <mat-select
                                #walletId
                                id="walletId"
                                formControlName="walletId"
                            >
                                <mat-option
                                    *ngFor="let element of wallet"
                                    [value]="element.id"
                                >
                                    {{ element.name }}
                                </mat-option>
                            </mat-select>
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Amount </mat-label>
                            <input
                                matInput
                                #sendAmount
                                type="number"
                                id="sendAmount"
                                formControlName="sendAmount"
                                placeholder="Amount"
                            />
                        </mat-form-field>
                    </p>
                </mat-card-content>
                <mat-card-actions>
                    <button
                        type="submit"
                        mat-raised-button
                        color="primary"
                        [disabled]="!form.valid || !isSubmitBtnEnable"
                    >
                        Submit
                    </button>
                </mat-card-actions>
            </mat-card>
        </form>
    `,
})
export class SendComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({});
    isLoading = false;
    isSubmitBtnEnable = true;
    ConfirmDialogState: string = '';

    wallet: IWallet[] = [];

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public _userState: UserState,
        private _transactionService: TransactionService,
        private _walletService: WalletService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            ReceiverId: ['', [Validators.required]],
            walletId: ['', [Validators.required]],
            sendAmount: ['', [Validators.required]],
        });

        this._walletService.sendWallet().subscribe((result) => {
            this.wallet = result.data;
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
                this._transactionService.insert(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (res.type == 'success') {
                            this.form.reset();
                            this.dialog.open(AlertDialogComponent, {
                                minWidth: 300,
                                data: {
                                    title: 'Success',
                                    type: 'success',
                                    msg: 'Send Successful',
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
                                    msg: 'Send Faild: ' + res.msg,
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
