import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ThemePalette } from '@angular/material/core';

import { UserState } from 'src/app/state/user.state';

@Component({
    selector: 'profile-component',
    standalone: true,
    imports: [CommonModule, MaterialModule],
    styles: [],
    template: `
        <style>
            .mat-tab-group {
                margin-bottom: 48px;
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

            .flex-center {
                display: flex;
                justify-content: center;
            }

            .title-name {
                margin: 0 0 10px 0;
                padding: 10px 5px;
                font-size: 1.7rem;
            }
        </style>
        <mat-card>
            <div>
                <div>
                    <div class="flex-center">
                        <img
                            mat-card-lg-image
                            class="header-user-image"
                            [src]="this._userState.state()?.image_thumb"
                            alt="Image"
                            aria-label="menu"
                        />
                    </div>
                    <div class="flex-center title-name">
                        <span>{{ this._userState.state()?.user_name }}</span>
                    </div>
                </div>

                <div>
                    <mat-tab-group mat-align-tabs="start" [color]="background">
                        <mat-tab label="Basic">
                            <table>
                                <tr>
                                    <td>User Name</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.user_name
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>First Name</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.first_name
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.last_name
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.email
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.phone
                                        }}</span>
                                    </td>
                                </tr>
                            </table>
                        </mat-tab>

                        <mat-tab label="Address">
                            <table>
                                <tr>
                                    <td>Country</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()
                                                ?.country__name
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.state
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.city
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>ZIP</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.zip
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address 1</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.address_1
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Address 2</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()?.address_2
                                        }}</span>
                                    </td>
                                </tr>
                            </table>
                        </mat-tab>

                        <mat-tab label="A/C">
                            <table>
                                <tr>
                                    <td>Role</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()
                                                ?.user_role__name
                                        }}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Reference</td>
                                    <td>
                                        <span>{{
                                            this._userState.state()
                                                ?.reference__user_name
                                        }}</span>
                                    </td>
                                </tr>
                            </table>
                        </mat-tab>
                    </mat-tab-group>
                </div>
                <div></div>
            </div>
        </mat-card>
    `,
})
export class ProfileComponent implements OnInit {
    background: ThemePalette = 'accent';
    constructor(public _userState: UserState) {}
    ngOnInit(): void {}
}
