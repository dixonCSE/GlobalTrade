import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _router: Router, private _authService: AuthService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let jwt = localStorage.getItem('jwt');
        let jwtToken = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + jwt,
            },
        });
        // return next.handle(jwtToken)
        return next.handle(jwtToken).pipe(tap(
            (event) => {
                //console.log(event);
                if (event.type === HttpEventType.Response) {
                    if (event.body.redirect) {
                        if (event.body.redirect == 'login') {
                            this._authService.userLogout();
                            //this._router.navigate(['/' + event.body.redirect]);
                        }
                    }
                }
            }
        ));
    }
}
