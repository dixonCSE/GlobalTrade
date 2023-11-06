import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BreakpointService {
    breakpoint: number = 4;
    displayNameMap = new Map([
        [Breakpoints.XSmall, 0],
        [Breakpoints.Small, 1],
        [Breakpoints.Medium, 2],
        [Breakpoints.Large, 3],
        [Breakpoints.XLarge, 4],
    ]);

    destroyed = new Subject<void>();

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver
            .observe([
                Breakpoints.XSmall,
                Breakpoints.Small,
                Breakpoints.Medium,
                Breakpoints.Large,
                Breakpoints.XLarge,
            ])
            .pipe(takeUntil(this.destroyed))
            .subscribe((result) => {
                for (const query of Object.keys(result.breakpoints)) {
                    if (result.breakpoints[query]) {
                        this.breakpoint = this.displayNameMap.get(query) ?? 4;
                    }
                }
            });
    }

    getBreakpoint() {
        return this.breakpoint;
    }
}
