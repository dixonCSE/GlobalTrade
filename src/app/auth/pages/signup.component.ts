import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/service/auth.service';
import { MaterialModule } from '../../material.module';
import { AlertDialogComponent } from '../../components/alert-dialog.component';

@Component({
    selector: 'signup-component',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MaterialModule, RouterLink],
    styles: [],
    template: `
        <style>
            * {
                color: #ffff;
            }
            .signupForm {
                min-width: 350px;
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

            .image-div {
                display: flex;
                justify-content: center;
            }

            .image {
                border-radius: 50%;
                margin-bottom: 10px;
                width: 80px;
                height: 80px;
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
        </style>
        <form
            class="signupForm"
            [formGroup]="signupForm"
            (ngSubmit)="onSignUp()"
        >
            <mat-card>
                <div class="loading-shade" *ngIf="isLoading">
                    <mat-spinner *ngIf="isLoading"></mat-spinner>
                </div>
                <div class="image-div">
                    <img
                        class="image"
                        src="https://via.placeholder.com/300.png/09f/fff"
                        alt="P"
                    />
                </div>

                <mat-card-title>SignUp</mat-card-title>
                <mat-card-content>
                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> User Name </mat-label>
                            <input
                                autofocus
                                matInput
                                id="user_name"
                                #user_name
                                formControlName="user_name"
                                placeholder="User Name as login ID"
                            />

                            <mat-hint
                                align="end"
                                *ngIf="
                                    signupForm.get('user_name')?.invalid &&
                                    (signupForm.get('user_name')?.dirty ||
                                        signupForm.get('user_name')?.touched)
                                "
                            >
                                <span
                                    *ngIf="signupForm.get('user_name')?.errors?.['required']"
                                >
                                    user name is required.
                                </span>
                            </mat-hint>
                        </mat-form-field>
                    </p>

                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Phone </mat-label>
                            <input
                                matInput
                                id="email"
                                #phone
                                formControlName="phone"
                                placeholder="Phone"
                            />
                        </mat-form-field>
                    </p>

                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Email </mat-label>
                            <input
                                matInput
                                id="email"
                                #email
                                formControlName="email"
                                placeholder="Email"
                            />
                        </mat-form-field>
                    </p>

                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Password </mat-label>
                            <input
                                matInput
                                #password
                                id="password"
                                type="password"
                                formControlName="password"
                                placeholder="Password"
                            />
                        </mat-form-field>
                    </p>

                    <p>
                        <mat-form-field appearance="outline" hideRequiredMarker>
                            <mat-label> Confirm Password </mat-label>
                            <input
                                matInput
                                #confirmpassword
                                id="confirmPassword"
                                type="password"
                                formControlName="confirmPassword"
                                placeholder="confirm Password"
                            />
                        </mat-form-field>
                    </p>
                </mat-card-content>
                <mat-card-actions>
                    <button
                        type="submit"
                        mat-raised-button
                        color="primary"
                        [disabled]="!signupForm.valid || !isSubmitBtnEnable"
                    >
                        Signup
                    </button>
                </mat-card-actions>

                <mat-card-actions class="link-area">
                    <a class="forgot_password" href="#"></a>

                    <a class="forgot_password" routerLink="/auth/login">
                        Login...
                    </a>
                </mat-card-actions>
            </mat-card>
        </form>
    `,
})
export class SignupComponent implements OnInit, OnDestroy {
    signupForm = this.fb.group({
        user_name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: [
            '',
            [Validators.required, this.confirmPassword('password')],
        ],
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

    onSignUp() {
        console.log(this.signupForm.value);
        this.isLoading = true;
        this.isSubmitBtnEnable = false;
        this._authService.userSignUp(this.signupForm.value).subscribe(
            (res) => {
                if (res.type == 'success') {
                    this.isLoading = false;
                    this.isSubmitBtnEnable = true;

                    this.dialog.open(AlertDialogComponent, {
                        minWidth: 300,
                        data: {
                            title: 'Success',
                            type: 'success',
                            msg: 'Signup Successful',
                            titleColor: 'green',
                        },
                    });
                } else {
                    this.isLoading = false;
                    this.isSubmitBtnEnable = true;

                    this.dialog.open(AlertDialogComponent, {
                        minWidth: 300,
                        data: {
                            title: 'Error',
                            type: 'error',
                            msg: 'Signup Faild',
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
