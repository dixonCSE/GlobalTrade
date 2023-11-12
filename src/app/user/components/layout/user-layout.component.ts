import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Event, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { BalanceState } from 'src/app/state/balance.state';
import { UserState } from 'src/app/state/user.state';

@Component({
    selector: 'user-layout',
    styles: [],
    template: `
        <style>
            /* ///////////////////////////////// begin header ///////////////////////////////// */

            .menu-bar {
                position: fixed;
                bottom: 0;
                z-index: 99;
            }

            .menu-bar-row {
                justify-content: space-between;
            }
            .top-bar {
                display: flex;
                justify-content: space-around;
                height: 100%;
                align-items: center;
            }
            .app-title {
                margin: 0 8px;
            }
            .header-logo {
                height: calc(100% - 13px);
                width: unset;
            }

            .header-spacer {
                flex: 1 1 auto;
            }

            .header-user-image {
                height: 40px;
                width: 40px;
                border-radius: 50%;
            }
            .mat-toolbar-multiple-rows {
                min-height: 54px;
            }
            .mat-toolbar-row,
            .mat-toolbar-single-row {
                height: 54px;
            }
            /* ////////////////////////////////// end header ////////////////////////////////// */

            mat-drawer-content {
                padding: 15px 10px;
            }
            .xcontainer {
                // min-height: calc(100vh - 96px);
                min-height: calc(100vh);
                width: 100%;
                display: block;
            }

            .drawer-container {
                width: 100%;
                /* height: calc(100vh - 96px); */
                min-height: calc(100vh);
                border: 1px solid #555;
                margin-bottom: 52px;
            }

            .drawer-side-container {
                width: 280px;
                background: rgb(13, 13, 46);
                color: #fff;
            }

            /* ///////////////////////////////// begin footer ///////////////////////////////// */

            /* ////////////////////////////////// end footer ////////////////////////////////// */
        </style>
        <mat-toolbar color="primary">
            <mat-toolbar-row class="top-bar">
                <div class="top-bar">
                    <img
                        mat-card-sm-image
                        class="header-logo"
                        src="https://placehold.jp/3d4070/ffffff/150x50.png"
                        alt="P"
                    />
                </div>
            </mat-toolbar-row>
        </mat-toolbar>

        <mat-toolbar color="primary" class="menu-bar">
            <mat-toolbar-row class="menu-bar-row">
                <a
                    mat-mini-fab
                    class="header-menu-icon"
                    aria-label="header-menu icon-button with menu icon"
                    routerLink="/user/home"
                    href="/user/home"
                >
                    <mat-icon>home</mat-icon>
                </a>

                <button
                    mat-mini-fab
                    class="header-menu-icon"
                    aria-label="header-menu icon-button with menu icon"
                    routerLink="/user/trade"
                    href="/user/trade"
                >
                    <mat-icon>waterfall_chart</mat-icon>
                </button>

                <button
                    mat-mini-fab
                    class="header-menu-icon"
                    aria-label="header-menu icon-button with menu icon"
                    (click)="navMenuDrawerToggle()"
                >
                    <mat-icon>menu</mat-icon>
                </button>

                <button
                    mat-mini-fab
                    class="header-menu-icon"
                    aria-label="header-menu icon-button with menu icon"
                    routerLink="/user/withdraw-bank"
                    href="/user/withdraw-bank"
                >
                    <mat-icon>add_circle</mat-icon>
                </button>

                <img
                    mat-card-sm-image
                    class="header-user-image"
                    [src]="this._userState.state()?.image_thumb"
                    alt="P"
                    [matMenuTriggerFor]="menu"
                    aria-label="menu"
                />

                <mat-menu #menu="matMenu">
                    <a
                        mat-menu-item
                        routerLink="/user/profile"
                        href="/user/profile"
                    >
                        <mat-icon>account_circle</mat-icon>
                        <span>Profile </span>
                    </a>
                    <button
                        mat-menu-item
                        (click)="this._authService.userLogout()"
                    >
                        <mat-icon>lock</mat-icon>
                        <span>Logout</span>
                    </button>
                </mat-menu>
            </mat-toolbar-row>
        </mat-toolbar>

        <div class="xcontainer">
            <mat-drawer-container class="drawer-container">
                <mat-drawer
                    #drawer
                    [mode]="sideNavMode"
                    [opened]="isSideNavOpen"
                    position="start"
                    class="drawer-side-container"
                >
                    <app-side-nav *ngIf="isSideNav"></app-side-nav>
                </mat-drawer>

                <mat-drawer-content>
                    <!-- //////////////////////////////////////////////////////////////////// -->

                    <router-outlet></router-outlet>
                    <div class="h-16"></div>
                </mat-drawer-content>
            </mat-drawer-container>
        </div>
    `,
})
export class UserLayout implements OnInit, OnDestroy {
    categories: any = null;
    title = 'ecom';

    isSideNavOpen: boolean = false; // true
    sideNavMode: MatDrawerMode = 'over';

    isSideCat: boolean = false;
    isSideNav: boolean = false;

    destroyed = new Subject<void>();

    displayNameMap = new Map([
        [Breakpoints.XSmall, false],
        [Breakpoints.Small, false],
        [Breakpoints.Medium, true],
        [Breakpoints.Large, true],
        [Breakpoints.XLarge, true],
    ]);

    displayNameMapMode = new Map([
        [Breakpoints.XSmall, 'over'],
        [Breakpoints.Small, 'over'],
        [Breakpoints.Medium, 'side'],
        [Breakpoints.Large, 'side'],
        [Breakpoints.XLarge, 'side'],
    ]);
    constructor(
        breakpointObserver: BreakpointObserver,
        private _router: Router,
        public _authService: AuthService,
        public _userState: UserState,
        public _balanceState: BalanceState
    ) {}

    @ViewChild('drawer')
    drawer!: MatSidenav;

    ngOnInit(): void {
        this._router.events.subscribe((_routerEvent: Event) => {
            if (_routerEvent instanceof NavigationStart) {
                if (!this.isSideNavOpen) {
                    this.drawer.close();
                }
            }
        });
        this._balanceState.loadState();
    }

    navMenuDrawerToggle() {
        this.isSideCat = false;
        if (this.drawer.opened && this.isSideNav) {
            this.drawer.close();
            this.isSideNav = false;
        } else {
            this.drawer.open();
            this.isSideNav = true;
        }
    }

    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
}
