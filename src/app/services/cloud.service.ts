import { Injectable } from '@angular/core';
import {FileDetails} from '../interfaces/music-file';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const endpoint: string = "https://musicfileapi.azurewebsites.net/api/MusicFile";

@Injectable()
export class CloudService {

  constructor(private http: HttpClient){}

  getFiles(): Observable<FileDetails[]>{
    return this.http.get<FileDetails[]>(endpoint);
  }
}
