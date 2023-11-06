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

@Component({
    selector: 'profile-update-component',
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
                <mat-card-title> Profile Update </mat-card-title>
                <mat-card-content>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> First Name </mat-label>
                            <input
                                matInput
                                #first_name
                                id="first_name"
                                formControlName="first_name"
                                placeholder="First Name"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> Last Name </mat-label>
                            <input
                                matInput
                                #last_name
                                id="last_name"
                                formControlName="last_name"
                                placeholder="Last Name"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> Phone </mat-label>
                            <input
                                matInput
                                #phone
                                id="phone"
                                formControlName="phone"
                                placeholder="Phone"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> Country </mat-label>
                            <input
                                matInput
                                #country
                                id="country"
                                formControlName="country"
                                placeholder="Country"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> State </mat-label>
                            <input
                                matInput
                                #state
                                id="state"
                                formControlName="state"
                                placeholder="State"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> City </mat-label>
                            <input
                                matInput
                                #city
                                id="city"
                                formControlName="city"
                                placeholder="City"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> ZIP </mat-label>
                            <input
                                matInput
                                #zip
                                id="zip"
                                formControlName="zip"
                                placeholder="ZIP"
                                maxlength="5"
                            />
                            <mat-hint align="end"
                                >{{ zip.value.length }} / 5</mat-hint
                            >
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> Address 1 </mat-label>

                            <textarea
                                matInput
                                #address_1
                                id="address_1"
                                formControlName="address_1"
                                placeholder="Address 1"
                            ></textarea>
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline">
                            <mat-label> Address 2 </mat-label>

                            <textarea
                                matInput
                                #address_2
                                id="address_2"
                                formControlName="address_2"
                                placeholder="Address 2"
                            ></textarea>
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
export class ProfileUpdateComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({});
    isLoading = false;
    isSubmitBtnEnable = true;
    ConfirmDialogState: string = '';

    constructor(
        public _userState: UserState,
        private fb: FormBuilder,
        private _userService: UserService,
        private _router: Router,
        public dialog: MatDialog
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            last_name: [
                this._userState.state()?.last_name,
                [Validators.required],
            ],
            first_name: [
                this._userState.state()?.first_name,
                [Validators.required],
            ],
            phone: [this._userState.state()?.phone, [Validators.required]],
            country: [this._userState.state()?.country__name],
            state: [this._userState.state()?.state],
            city: [this._userState.state()?.city],
            zip: [this._userState.state()?.zip],
            address_1: [this._userState.state()?.address_1],
            address_2: [this._userState.state()?.address_2],
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
                this._userService.userUpdate(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (res.type == 'success') {
                            this.dialog.open(AlertDialogComponent, {
                                minWidth: 300,
                                data: {
                                    title: 'Success',
                                    type: 'success',
                                    msg: 'Update Successful',
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
                                    msg: res.msg,
                                    titleColor: 'red',
                                },
                            });
                        }
                    },
                    (err) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;
                        console.log(err);
                        this.dialog.open(AlertDialogComponent, {
                            disableClose: false,
                            minWidth: 300,
                            data: {
                                title: 'Error',
                                type: 'error',
                                msg: err.statusText,
                                titleColor: 'red',
                            },
                        });
                    }
                );
            }
        });
    }
}
