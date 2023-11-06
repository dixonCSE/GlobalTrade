import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/service/auth.service';
import { MaterialModule } from '../../material.module';
import { AlertDialogComponent } from '../../components/alert-dialog.component';

@Component({
    selector: 'forgot-password-component',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
    styles: [],
    template: `
        <style>
            * {
                color: #ffff;
            }
            .form {
                min-width: 300px;
                margin: 20px auto;
            }

            mat-form-field {
                width: 100%;
            }

            mat-card {
                padding: 15px 8px;
            }
            mat-card-title {
                text-align: center;
                margin: 10px auto 20px;
                font-size: 25px;
                font-weight: 500;
            }

            .forgot_password {
                text-decoration: none;
                margin-left: 7px;
            }

            a {
                text-decoration: none;
            }

            mat-card-actions.link-area {
                display: flex;
                justify-content: space-between;
            }

            mat-card-title {
                color: #fff;
            }
        </style>
        <form
            class="form"
            [formGroup]="forgotPasswordForm"
            (ngSubmit)="onSubmit()"
        >
            <mat-card>
                <div class="loading-shade" *ngIf="isLoading">
                    <mat-spinner *ngIf="isLoading"></mat-spinner>
                </div>

                <mat-card-title>Forgot Password</mat-card-title>
                <mat-card-content>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Email ID </mat-label>
                            <input
                                matInput
                                id="email"
                                #email
                                formControlName="email"
                                placeholder="your Email"
                            />
                            <mat-icon
                                color="white"
                                matSuffix
                                aria-hidden="false"
                                aria-label="icon"
                                fontIcon="email"
                            ></mat-icon>
                        </mat-form-field>
                    </p>
                </mat-card-content>
                <mat-card-actions>
                    <button
                        type="submit"
                        mat-raised-button
                        color="primary"
                        [disabled]="
                            !forgotPasswordForm.valid || !isSubmitBtnEnable
                        "
                    >
                        Submit
                    </button>
                </mat-card-actions>

                <mat-card-actions class="link-area">
                    <a class="forgot_password" routerLink="/auth/login">
                        Login here...
                    </a>

                    <a class="signup" routerLink="/auth/signup">Sign Up...</a>
                </mat-card-actions>
            </mat-card>
        </form>
    `,
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required]],
    });

    isLoading = false;
    isSubmitBtnEnable = true;
    isPasswordHide = true;

    constructor(
        private fb: FormBuilder,
        private _authService: AuthService,
        private _router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {}
    ngOnDestroy(): void {}

    onSubmit() {
        console.log(this.forgotPasswordForm.value);

        if (!this.forgotPasswordForm.valid) return;
        this.isLoading = true;
        this.isSubmitBtnEnable = false;

        this._authService
            .forgotPassword(this.forgotPasswordForm.value)
            .subscribe(
                (res) => {
                    console.log(res);

                    if (res.type == 'success') {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;
                        this.dialog.open(AlertDialogComponent, {
                            disableClose: false,
                            minWidth: 300,
                            data: {
                                title: 'Success',
                                type: 'success',
                                msg: 'Check Your Email',
                                titleColor: 'green',
                            },
                        });
                    } else {
                        this.isLoading = false;
                        this.isSubmitBtnEnable = true;
                        this.dialog.open(AlertDialogComponent, {
                            disableClose: false,
                            minWidth: 300,
                            data: {
                                title: 'Error',
                                type: 'error',
                                msg: res.body.msg,
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
}
