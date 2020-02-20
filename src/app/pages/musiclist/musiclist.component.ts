import { Component, OnInit } from '@angular/core';
import { CloudService } from 'src/app/services/cloud.service';
import { FileDetails } from 'src/app/interfaces/music-file';
import { MatDialog } from '@angular/material/dialog';
import { AlertConfirmComponent } from 'src/app/alert-confirm/alert-confirm.component';

@Component({
  selector: 'musiclist-edit',
  templateUrl: './musiclist.component.html',
  styleUrls: ['./musiclist.component.scss']
})
export class MusicListComponent implements OnInit {

  public isLoading = false;
  public files: Array<FileDetails> = [];

  constructor(public cloudService: CloudService, private dialog: MatDialog) { }

  ngOnInit(){
    this.loadMusic();
  }

   async loadMusic(){
    try
    {
      this.isLoading = true;
      (await this.cloudService.getFiles()).subscribe( files => {
        this.files = files;
      });
    }
    catch(error)
    {
      console.log("error", error);
    }
    finally
    {
      this.isLoading = false;
    }
   }

   async delete(fileName?: string){
     let isConfirmed = await this.openConfirmDialog();
     if(isConfirmed){
       console.log("isConfirmed");
     }
   }

   edit(){
    console.log("edit");
   }

   openConfirmDialog(title?: string, message?: string, button?: string): boolean {
     let res: boolean = false;
    const dialogRef = this.dialog.open(AlertConfirmComponent,{
      data:{
        title: title,
        message: message,
        buttonText: {
          cancel: button
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      return result
    });
    return res;
  }
}
