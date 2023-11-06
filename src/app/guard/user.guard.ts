import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class UserGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        // return true;

        if (this.auth.isLogin()) {
            return true;
        } else {
            //this.router.navigate(['/']);
            this.auth.userLogout();
            return false;
        }
    }
}
