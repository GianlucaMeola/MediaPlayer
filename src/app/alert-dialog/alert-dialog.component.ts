import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html'
})
export class AlertDialogComponent {
    title: string = "";
    message: string = "";
    cancelButtonText = "OK";
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<AlertDialogComponent>) {
        if (data) {
            this.title = data.title || this.title;
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
        this.dialogRef.updateSize('300vw', '300vw')
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

}