import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private readonly WSURL = 'ws://localhost:3000';
    private webSocketSubject = webSocket<string>(this.WSURL);

    public WebSocket$ = this.webSocketSubject.asObservable();

    open(): void {
        this.webSocketSubject.next('hello');
    }

    close(): void {
        this.webSocketSubject.next('hello');
    }

    send(): void {
        this.webSocketSubject.next('hello');
    }

    read(): void {
        this.webSocketSubject.next('hello');
    }
}
