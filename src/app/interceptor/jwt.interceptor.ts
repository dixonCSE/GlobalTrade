import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
    constructor() {}
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
        return next.handle(jwtToken);
    }
}
