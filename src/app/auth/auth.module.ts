import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';

import { MaterialModule } from '../material.module';
import { AuthLayout } from './components/layout/auth-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AuthLayout,
        data: {
            preload: false,
            moduleName: 'user',
        },
        children: [
            {
                path: '',
                redirectTo: '/auth/login',
                pathMatch: 'full',
            },
            {
                path: 'login',
                title: 'Auth',
                loadComponent: () =>
                    import('./pages/login.component').then(
                        (mod) => mod.LoginComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'auth',
                },
            },
            {
                path: 'signup',
                title: 'Auth',
                loadComponent: () =>
                    import('./pages/signup.component').then(
                        (mod) => mod.SignupComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'auth',
                },
            },
            {
                path: 'forgot-password',
                title: 'Auth',
                loadComponent: () =>
                    import('./pages/forgot-password.component').then(
                        (mod) => mod.ForgotPasswordComponent
                    ),
                pathMatch: 'full',
                data: {
                    preload: false,
                    moduleName: 'auth',
                },
            },
            {
                path: '**',
                redirectTo: '/auth/login',
            },
        ],
    },
];

@NgModule({
    declarations: [AuthLayout],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        MaterialModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule],
})
export class AuthModule {}
