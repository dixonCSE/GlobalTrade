import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../material.module';
import { UserLayout } from './components/layout/user-layout.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { SideNavItemComponent } from './components/layout/side-nav-item/side-nav-item.component';
import { AlertDialogComponent } from './components/alert-dialog.component';
import { NotificationDialogComponent } from './components/notification-dialog.component';
import { ConfirmDialogComponent } from './components/confirm-dialog.component';
import { UserGuard } from '../guard/user.guard';

import { UserState } from '../state/user.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ResInterceptor } from '../interceptor/res.interceptor';

const routes: Routes = [
    {
        path: '',
        component: UserLayout,
        data: {
            preload: false,
            moduleName: 'user',
        },
        canActivate: [UserGuard],
        children: [
            {
                path: '',
                redirectTo: '/user/dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                title: 'User',
                loadComponent: () =>
                    import('./pages/home.component').then(
                        (mod) => mod.HomeComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'profile',
                title: 'User',
                loadComponent: () =>
                    import('./pages/profile.component').then(
                        (mod) => mod.ProfileComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'profile-update',
                title: 'User',
                loadComponent: () =>
                    import('./pages/profile-update.component').then(
                        (mod) => mod.ProfileUpdateComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'password-update',
                title: 'User',
                loadComponent: () =>
                    import('./pages/password-update.component').then(
                        (mod) => mod.PasswordUpdateComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },

            {
                path: 'send',
                title: 'User',
                loadComponent: () =>
                    import('./pages/send.component').then(
                        (mod) => mod.SendComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'receive-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/receive-datatable.component').then(
                        (mod) => mod.ReceiveDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'send-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/send-datatable.component').then(
                        (mod) => mod.SendDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'withdraw-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/withdraw-datatable.component').then(
                        (mod) => mod.WithdrawDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'withdraw',
                title: 'User',
                loadComponent: () =>
                    import('./pages/withdraw-bank.component').then(
                        (mod) => mod.WithdrawBankComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'withdraw-bank',
                title: 'User',
                loadComponent: () =>
                    import('./pages/withdraw-bank.component').then(
                        (mod) => mod.WithdrawBankComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'addfund-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/addfund-datatable.component').then(
                        (mod) => mod.AddfundDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'addfund',
                title: 'User',
                loadComponent: () =>
                    import('./pages/addfund-bank.component').then(
                        (mod) => mod.AddfundBankComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'exchange-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/exchange-datatable.component').then(
                        (mod) => mod.ExchangeDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'trade',
                title: 'User',
                loadComponent: () =>
                    import('./pages/trade.component').then(
                        (mod) => mod.TradeComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'trade-complete-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/trade-complete-datatable.component').then(
                        (mod) => mod.TradeCompleteDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'trade-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/trade-complete-list.component').then(
                        (mod) => mod.TradeCompleteListComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: 'trade-pending-report',
                title: 'User',
                loadComponent: () =>
                    import('./pages/trade-pending-datatable.component').then(
                        (mod) => mod.TradePendingDatatableComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'user',
                },
            },
            {
                path: '**',
                redirectTo: '/user/dashboard',
            },
        ],
    },
];

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        MaterialModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResInterceptor,
            multi: true,
        },
    ],
    declarations: [
        UserLayout,
        SideNavComponent,
        SideNavItemComponent,
        NotificationDialogComponent,
        AlertDialogComponent,
        ConfirmDialogComponent,
    ],
})
export class UserModule {
    constructor(public _userState: UserState) {
        _userState.loadUserState();
    }
}
