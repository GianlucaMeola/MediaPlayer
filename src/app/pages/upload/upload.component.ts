import { Component, OnInit } from '@angular/core';
import {CloudService} from '../../services/cloud.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public payload = new FormData();

  constructor(public cloudService: CloudService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.buildForm();
   }

   public musicForm: FormGroup;

   get formValue(){ return this.musicForm.value; }
   get Artist() {return this.musicForm.get("artist");}
   get Title() {return this.musicForm.get("title");}
   get File() {return this.musicForm.get("musicFile");}
   
  ngOnInit(): void {
  }

  buildForm() {
    this.musicForm = this.formBuilder.group(
        {
          musicFile: ['', [Validators.required]],
          artist: ['', [Validators.required]],
          title: ['', [Validators.required]]
        });
    }

    uploadMusic(){
      var formData: any = new FormData();
      formData.append('musicFile', this.musicForm.get("musicFile").value);
      formData.append('artist', this.musicForm.get("artist").value);
      formData.append('title', this.musicForm.get("title").value);
      this.cloudService.postFile(formData);
    }

    uploadFile(event) {
      let newFile = (event.target as HTMLInputElement).files[0];
      this.musicForm.patchValue({
        musicFile: newFile
      });
      this.musicForm.get('musicFile').updateValueAndValidity();
    }
}
