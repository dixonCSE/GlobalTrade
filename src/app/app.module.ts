import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { NotificationDialogComponent } from 'src/app/components/notification-dialog.component';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog.component';
import { AlertDialogComponent } from 'src/app/components/alert-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        NotificationDialogComponent,
        AlertDialogComponent,
        ConfirmDialogComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        { provide: DEFAULT_CURRENCY_CODE, useValue: '৳' },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AppModule {}
