import { Component, OnInit } from '@angular/core';
import {CloudService} from '../../services/cloud.service'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(public cloudService: CloudService) { }

  ngOnInit(): void {
  }

  public payload: string = "test";

  async upload(){
    await this.cloudService.postFile(this.payload);
  }

}
