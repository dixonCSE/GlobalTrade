import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { UserState } from 'src/app/state/user.state';
import {
    AbstractControl,
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
    selector: 'password-update-component',
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
                <mat-card-title> Password Update </mat-card-title>
                <mat-card-content>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Current password </mat-label>
                            <input
                                matInput
                                #currentPassword
                                id="currentPassword"
                                type="password"
                                formControlName="currentPassword"
                                placeholder="Current password"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> New password </mat-label>
                            <input
                                matInput
                                #newPassword
                                id="newPassword"
                                type="password"
                                formControlName="newPassword"
                                placeholder="New password"
                            />
                        </mat-form-field>
                    </p>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Confirm new password </mat-label>
                            <input
                                matInput
                                #confirmNewPassword
                                id="confirmNewPassword"
                                type="password"
                                formControlName="confirmNewPassword"
                                placeholder="Confirm new password"
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
export class PasswordUpdateComponent implements OnInit, OnDestroy {
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
            currentPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            confirmNewPassword: [
                '',
                [Validators.required, this.confirmPassword('newPassword')],
            ],
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
                this._userService.passwordUpdate(this.form.value).subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;

                        if (parseInt(res.status) == 200) {
                            if (res.body.type == 'success') {
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
                                        msg: 'Update Faild: ' + res.status,
                                        titleColor: 'red',
                                    },
                                });
                            }
                        } else {
                            this.dialog.open(AlertDialogComponent, {
                                disableClose: false,
                                minWidth: 300,
                                data: {
                                    title: 'Error',
                                    type: 'error',
                                    msg:
                                        'Http response status code: ' +
                                        res.status,
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

    confirmPassword(password: string) {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            if (!control.parent) {
                return null;
            }
            const thisValue = control.value;
            const otherValue = control.parent.get(password)?.value;
            if (thisValue === otherValue) {
                return null;
            }

            return {
                'not match': true,
            };
        };
    }
}
