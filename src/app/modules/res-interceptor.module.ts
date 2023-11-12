import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResInterceptor } from '../interceptor/res.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResInterceptor,
            multi: true,
        },
    ],
})
export class ResInterceptorModule {
    constructor() {
        console.log('ResInterceptorModule');
    }
}
