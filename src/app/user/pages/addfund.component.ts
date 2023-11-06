import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { AddfundService } from 'src/app/service/addfund.service';
import { IBank } from 'src/app/interface/bank.interface';
import { BankService } from 'src/app/service/bank.service';

@Component({
    selector: 'addfund-component',
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
                <mat-card-title> Add fund Form {{ amount }}</mat-card-title>
                <mat-card-content>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Bank </mat-label>
                            <mat-select
                                #bankId
                                id="bankId"
                                formControlName="bankId"
                            >
                                <mat-option
                                    *ngFor="let element of bank"
                                    [value]="element.id"
                                >
                                    {{ element.name }}
                                </mat-option>
                            </mat-select>
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Bank A/C </mat-label>
                            <input
                                matInput
                                #bankAC
                                id="bankAC"
                                formControlName="bankAC"
                                placeholder="Bank A/C"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Amount </mat-label>
                            <input
                                matInput
                                #addfundAmount
                                type="number"
                                id="addfundAmount"
                                formControlName="addfundAmount"
                                placeholder="Amount"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> TRXID </mat-label>
                            <input
                                matInput
                                #trxid
                                id="trxid"
                                formControlName="trxid"
                                placeholder="TRXID"
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
export class AddfundComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({});
    isLoading = false;
    isSubmitBtnEnable = true;
    ConfirmDialogState: string = '';

    bank: IBank[] = [];

    @Input() inputbank: IBank | undefined;
    @Input() amount: number | undefined;

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        public _userState: UserState,
        private _bankService: BankService,
        private _addfundService: AddfundService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            bankId: ['', [Validators.required]],
            addfundAmount: ['100', [Validators.required]],
            bankAC: ['', [Validators.required]],
            trxid: ['', [Validators.required]],
        });

        this._bankService.addfundBank().subscribe((result) => {
            this.bank = result.data;
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
                this._addfundService.insert(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (res.type == 'success') {
                            this.dialog.open(AlertDialogComponent, {
                                minWidth: 300,
                                data: {
                                    title: 'Success',
                                    type: 'success',
                                    msg: 'insert Successful',
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
