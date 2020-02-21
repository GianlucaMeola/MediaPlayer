import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

const NO_SPECIAL_CHAR = /^[^*|\":<>[\]{}`\\()';@&$éàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;

@Component({
    selector: 'app-editor',
    templateUrl: './alert-editor.component.html'
})
export class AlertEditorComponent {
    formTitle: string = "Editor";
    artistLabel: string = "Artist";
    titleLabel: string = "Title";
    artist: string = "";
    title: string = "";
    uri: string = "";
    confirmButtonText = "OK";
    cancelButtonText = "Cancel";

    public editorForm = new FormGroup({
        artist: new FormControl(),
        title: new FormControl()
    })
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<AlertEditorComponent>,
        private formBuilder: FormBuilder) {
        if (data) {
            this.formTitle = data.formTitle || this.formTitle;
            this.titleLabel = data.titleLabel || this.titleLabel;
            this.artistLabel = data.artistLabel || this.artistLabel;
            this.artist = data.artist || this.artist;
            this.title = data.title || this.title;
            this.uri = data.uri || this.uri;
        }
        this.dialogRef.updateSize('90%', '500vw');
        this.buildForm();
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

    onCancelClick(): void {
        this.dialogRef.close(false);
    }

    buildForm() {
        this.editorForm = this.formBuilder.group(
            {
              musicFile: [this.uri, [Validators.required]],
              artist: [this.artist, [Validators.required, Validators.pattern(NO_SPECIAL_CHAR)]],
              title: [this.title, [Validators.required, Validators.pattern(NO_SPECIAL_CHAR)]]
            });
        }
}