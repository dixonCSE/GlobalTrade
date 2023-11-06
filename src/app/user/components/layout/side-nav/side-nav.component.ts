import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
    navmenus = [
        {
            name: 'Dashboard',
            routerLink: '/user',
            icon: '',
            title: 'Dashboard',
        },

        {
            name: 'Profile',
            routerLink: 'profile',
            icon: '',
            submenus: [
                {
                    name: 'profile',
                    routerLink: '/user/profile',
                    icon: '',
                },
                {
                    name: 'Update',
                    routerLink: '/user/profile-update',
                    icon: '',
                },
                {
                    name: 'Password',
                    routerLink: '/user/password-update',
                    icon: '',
                },
            ],
        },

        {
            name: 'Transaction',
            routerLink: 'transaction',
            icon: '',
            submenus: [
                {
                    name: 'Send',
                    routerLink: '/user/send',
                    icon: '',
                },
                {
                    name: 'Send Report',
                    routerLink: '/user/send-report',
                    icon: '',
                },
                {
                    name: 'Receive Report',
                    routerLink: '/user/receive-report',
                    icon: '',
                },
            ],
        },

        {
            name: 'Withdraw',
            routerLink: 'withdraw',
            icon: '',
            submenus: [
                {
                    name: 'Withdraw',
                    routerLink: '/user/withdraw',
                    icon: '',
                },
                {
                    name: 'Report',
                    routerLink: '/user/withdraw-report',
                    icon: '',
                },
            ],
        },

        {
            name: 'Add Fund',
            routerLink: 'addfund',
            icon: '',
            submenus: [
                {
                    name: 'Add Fund',
                    routerLink: '/user/addfund',
                    icon: '',
                },
                {
                    name: 'Report',
                    routerLink: '/user/addfund-report',
                    icon: '',
                },
            ],
        },

        /* {
            name: 'Exchange',
            routerLink: 'exchange',
            icon: '',
            submenus: [
                {
                    name: 'Exchange',
                    routerLink: '/user/exchange',
                    icon: '',
                },
                {
                    name: 'Report',
                    routerLink: '/user/exchange-report',
                    icon: '',
                },
            ],
        }, */

        {
            name: 'Trade',
            routerLink: 'trade',
            icon: '',
            submenus: [
                {
                    name: 'Trade',
                    routerLink: 'trade',
                    icon: '',
                },
                {
                    name: 'Report',
                    routerLink: '/user/trade-report',
                    icon: '',
                },
            ],
        },
    ];

    level: number = 1;

    constructor() {}

    ngOnInit(): void {}
}
