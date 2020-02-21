import { Component, OnInit } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { FileDetails } from 'src/app/interfaces/music-file';
import { MatDialog } from '@angular/material/dialog';
import { AlertConfirmComponent } from 'src/app/alert-confirm/alert-confirm.component';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';

@Component({
  selector: 'musiclist-edit',
  templateUrl: './musiclist.component.html',
  styleUrls: ['./musiclist.component.scss']
})
export class MusicListComponent implements OnInit {
  public isLoading = false;
  public files: Array<FileDetails> = [];

  constructor(public cloudService: CloudService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadMusic();
  }

  async loadMusic() {
    try {
      this.isLoading = true;
      (await this.cloudService.getFiles()).subscribe(files => {
        this.files = files;
      });      
    }
    catch (error) {
      console.log("error", error);
    }
    finally {
      this.isLoading = false;
    }
  }

  async delete(file: FileDetails) {
    let isConfirmed = await this.openConfirmDialog();
    if (!isConfirmed ||file.uri=="" || file.uri==null) return;
    this.openConfirmDialog
    this.isLoading = true;
    var formData: any = new FormData();
    try {
      formData.append('fileName', file.uri);
      let res = await this.cloudService.delete(formData);
      this.openAlertDialog('Success!', file.title +" "+ res.toString());
    } catch (e) {
      let errors = e.error;
      errors.forEach(error => {
        this.openAlertDialog("Error", (error.description))
      });
    } finally {
      this.isLoading = false;
    }
  }

  edit() {
    console.log("edit");
  }

  openAlertDialog(title: string, message?: string, button?: string, ) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: title,
        message: message,
        buttonText: {
          cancel: button
        }
      },
    });
  }

  async openConfirmDialog(title?: string, message?: string, button?: string): Promise<boolean> {
    const dialogRef = this.dialog.open(AlertConfirmComponent, {
      data: {
        title: title,
        message: message,
        buttonText: {
          cancel: button
        }
      },
    });

    return await dialogRef.afterClosed().toPromise();
  }
}
