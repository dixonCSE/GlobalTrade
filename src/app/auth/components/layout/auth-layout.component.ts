import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'auth-layout',
    styles: [],
    template: `
        <style>
            .container {
                display: flex;
                justify-content: center;
            }
        </style>
        <mat-toolbar color="primary">
            <mat-toolbar-row>
                <span>Auth</span>
                <span class="example-spacer"></span>
            </mat-toolbar-row>
        </mat-toolbar>

        <div class="container">
            <router-outlet></router-outlet>
        </div>

        <div class="user-footer">
            <span class="coptyright"></span>
        </div>
    `,
})
export class AuthLayout implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
