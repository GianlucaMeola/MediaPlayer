import { Injectable } from '@angular/core';
import {FileDetails, PayloadDetails} from '../interfaces/music-file';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SettingsProvider } from '../config/settings.provider';
import{BaseService} from './base.service';

@Injectable()
export class CloudService extends BaseService {

  constructor(private http: HttpClient, private settingsProvider: SettingsProvider,){
    super();
  }

  getFiles():any{
    try
    {
    return this.http.get<FileDetails[]>(this.settingsProvider.configuration.BASEURL, this.prepareHeaders());
    }
    catch(error)
    {
      console.log(error)
    }
  }

   postFile(formData: any){
    try
    {
      this.http.post(this.settingsProvider.configuration.BASEURL, formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    }
    catch(error)
    {
      console.log(error);
    }
  }
}
