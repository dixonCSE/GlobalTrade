import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../interface/dialog-data.interface';

@Component({
    selector: 'app-alert-dialog',
    styles: [
        '.title-center {text-align: center;}',
        '.justify-content-center {justify-content: center;}',
    ],
    template: `
        <h1
            mat-dialog-title
            class="title-center"
            [style.color]="data.titleColor"
        >
            {{ data.title }}
        </h1>
        <div mat-dialog-content style="text-align: center">{{ data.msg }}</div>
        <div mat-dialog-actions class="justify-content-center">
            <button mat-raised-button color="primary" mat-dialog-close>
                Close
            </button>
        </div>
    `,
})
export class AlertDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData) {}

    ngOnInit(): void {}
}
