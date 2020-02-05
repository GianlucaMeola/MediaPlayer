import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {MusicFile} from '../interfaces/music-file'

@Injectable({
  providedIn: 'root'
})
export class CloudService {

  files: MusicFile[] = [
    // tslint:disable-next-line: max-line-length
    {
      url:
        "https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3",
      name: "Perfect",
      artist: " Ed Sheeran"
    },
    {
      // tslint:disable-next-line: max-line-length
      url:"https://ia801409.us.archive.org/31/items/dearbasketballkobebryantoscarwinnershortfilm/DEAR%20BASKETBALL%20-%20KOBE%20BRYANT%20%28Oscar%20Winner%20Short%20Film%29.mp3",
      name: "DEAR BASKETBALL - KOBE BRYANT (Oscar Winner Short Film)",
      artist: "KOBE BRYANT"
    }
  ];  

  getFiles(){
    return of(this.files);
  }
}
