import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'confirm-dialog',
    styles: [
        '.title-center {text-align: center;}.justify-content-center {justify-content: center;}',
    ],
    template: `
        <h1 mat-dialog-title class="title-center">
            {{ title }}
        </h1>
        <div mat-dialog-content>
            {{ msg }}
            <!-- Are you sure you want to do this? -->
        </div>
        <div mat-dialog-actions class="justify-content-center">
            <button mat-raised-button color="warn" (click)="onFalse()">
                No
            </button>
            <button mat-raised-button color="primary" (click)="onTrue()">
                Yes
            </button>
        </div>
    `,
})
export class ConfirmDialogComponent {
    title!: string;
    msg!: string;
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
    ) {
        this.title = data.title;
        this.msg = data.msg;
    }

    ngOnInit(): void {}

    onTrue(): void {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }

    onFalse(): void {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
}

export class ConfirmDialogModel {
    constructor(public title: string, public msg: string) {}
}
