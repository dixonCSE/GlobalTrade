import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    title: string;
    type: 'success' | 'warning' | 'error';
    msg: string;
    titleColor: string;
}

@Component({
    selector: 'notification-dialog',
    styles: [
        '.title-center {text-align: center;}.justify-content-center {justify-content: center;}',
    ],
    template: `
        <h1
            mat-dialog-title
            class="title-center"
            [style.color]="data.titleColor"
        >
            {{ data.title }}
        </h1>
        <div mat-dialog-content>{{ data.msg }}</div>
        <div mat-dialog-actions class="justify-content-center">
            <button mat-raised-button color="primary" mat-dialog-close>
                Close
            </button>
        </div>
    `,
})
export class NotificationDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void {}
}
