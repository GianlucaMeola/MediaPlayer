import { Injectable } from '@angular/core';
import {FileDetails} from '../interfaces/music-file';
import { HttpClient } from '@angular/common/http';
import { SettingsProvider } from '../config/settings.provider';
import{BaseService} from './base.service';

import { catchError , map, tap} from 'rxjs/operators';
import { Observable , throwError} from 'rxjs';

@Injectable()
export class CloudService extends BaseService {

  public response: any;

  constructor(private http: HttpClient, private settingsProvider: SettingsProvider,){
    super();
  }

  getFiles():any{
    return this.http.get<FileDetails[]>(this.settingsProvider.configuration.BASEURL, this.prepareHeaders());
  }

  postFile(formData: any):Promise<object>{
    return  this.http.post(this.settingsProvider.configuration.BASEURL, formData)
            .pipe(tap((response) => {this.response = <any>response;}), catchError(this.handlerError)).toPromise();
  }

  delete(formData: any):Promise<object>{
    return this.http.delete(this.settingsProvider.configuration.BASEURL, formData)
            .pipe(tap((response) => {this.response = <any>response;}), catchError(this.handlerError)).toPromise();
  }

  private handlerError(error : Response)
    {
        console.error(error);
        return throwError(error);
    }
}
