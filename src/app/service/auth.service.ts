import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _loginUrl: string = 'auth/api/login';
    private _signupUrl: string = 'auth/api/signup';
    private _forgotPasswordUrl: string = 'auth/api/forgot-password';
    private _loadUserUrl: string = 'user/api/user_data';

    constructor(private _router: Router, public _commonService: CommonService) {
        //
    }

    /* userLogin(loginData: any): Observable<any> {
        return this.http.post<any>(this._loginUrl, loginData, {
            observe: 'response',
        });
    } */

    userLogin(reqData: any): Observable<any> {
        return this._commonService.post(this._loginUrl, reqData);
    }

    userLogout() {
        this._commonService.userLogout();
    }

    userSignUp(reqData: any): Observable<any> {
        return this._commonService.post(this._signupUrl, reqData);
    }

    forgotPassword(reqData: any): Observable<any> {
        return this._commonService.post(this._forgotPasswordUrl, reqData);
    }

    isLogin = () => {
        return !!localStorage.getItem('jwt');
    };

    userData(): Observable<any> {
        return this._commonService.get(this._loadUserUrl);
    }
}
