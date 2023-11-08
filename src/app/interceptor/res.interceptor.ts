import {
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ResInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        /* return next.handle(req).pipe(tap(
            (event) => {
                if (event.type === HttpEventType.Response) {
                    if (event.body.redirect) {
                        if (event.body.redirect == 'login') {
                            this._authService.userLogout();
                        }
                    }
                }
                console.log('resInterceptor')
            }
        )); */

        console.log('resInterceptor');
        return next.handle(req);
    }
}
