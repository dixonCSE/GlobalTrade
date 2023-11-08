import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserState } from 'src/app/state/user.state';
import { BalanceState } from 'src/app/state/balance.state';
import { GlobalConstants as gData } from 'src/app/data/global-constants';

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [CommonModule],
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
        </style>

        <section class="my-2">
            <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3">
                <div
                    class="flex justify-start items-center bg-blue-950 rounded-md p-2 border-2 border-solid border-fuchsia-900"
                >
                    <div>
                        <img
                            class="w-36 h-36 rounded"
                            src="{{ this._userState.state()?.image_thumb }}"
                            alt="Photo"
                        />
                    </div>
                    <div>
                        <div class="text-lg  text-amber-500">
                            {{ this._userState.state()?.user_name }}
                        </div>
                        <div class="text-lg">
                            {{ this._userState.state()?.email }}
                        </div>
                        <div class="text-lg">
                            {{ this._userState.state()?.phone }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="my-3">
            <div class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
                <div
                    class="bg-blue-950 rounded-md p-2 border-2 border-solid border-fuchsia-900"
                >
                    <div class="flex justify-between items-center">
                        <div>
                            <img
                                class="w-12 h-12 rounded"
                                src="{{ assetsBase + this._balanceState.state()?.['user_bonus']?.image }}"
                                alt="Photo"
                            />
                        </div>
                        <div class="text-center">
                            <div class="text-xl font-bold">
                                {{ this._balanceState.state()?.['user_bonus']?.name }}
                            </div>
                            <div class="font-light px-5">
                                {{ this._balanceState.state()?.['user_bonus']?.value | currency }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-blue-950 rounded-md p-2 border-2 border-solid border-fuchsia-900"
                >
                    <div class="flex justify-between items-center">
                        <div>
                            <img
                                class="w-12 h-12 rounded"
                                src="{{ assetsBase + this._balanceState.state()?.['user_current']?.image }}"
                                alt="Photo"
                            />
                        </div>
                        <div class="text-center">
                            <div class="text-xl font-bold">
                                {{ this._balanceState.state()?.['user_current']?.name }}
                            </div>
                            <div class="font-light px-5">
                                {{ this._balanceState.state()?.['user_current']?.value| currency }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-3">
                <div
                    class="bg-blue-950 rounded-md p-2 border-2 border-solid border-fuchsia-900"
                >
                    <table>
                        <tr>
                            <td>Total Withdraw</td>
                            <td>
                                <span>{{ 100 | currency }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Total Addfund</td>
                            <td>
                                <span>{{ 100 | currency }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Total UP</td>
                            <td>
                                <span>{{ 100 | currency }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Total Down</td>
                            <td>
                                <span>{{ 100 | currency }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Total send</td>
                            <td>
                                <span>{{ 100 | currency }}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    `,
})
export class HomeComponent implements OnInit {
    assetsBase = gData.assetsBaseURL;
    constructor(
        public _userState: UserState,
        public _balanceState: BalanceState
    ) {}
    ngOnInit(): void {}
}
