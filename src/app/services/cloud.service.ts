import { Injectable } from '@angular/core';
import {FileDetails} from '../interfaces/music-file';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SettingsProvider } from '../config/settings.provider';

@Injectable()
export class CloudService {

  constructor(private http: HttpClient, private settingsProvider: SettingsProvider,){}

  async getFiles(){
    try
    {
    return await this.http.get<FileDetails[]>(this.settingsProvider.configuration.BASEURL);
    }
    catch(HttpErrorResponse)
    {
      console.log(HttpErrorResponse)
    }
  }
}
