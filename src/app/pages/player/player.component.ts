import { Component, OnInit } from '@angular/core';
import {AudioService} from '../../services/audio.service';
import {CloudService} from '../../services/cloud.service';
import {StreamState} from '../../interfaces/stream-state';
import {MusicFile} from '../../interfaces/music-file';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{

  files: Array<MusicFile> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(public audioService: AudioService, public cloudService: CloudService) {
    cloudService.getFiles().subscribe( files => {
      this.files = files;
    });

    this.audioService.getState().subscribe( state => {
      this.state = state;
    });
   }

   ngOnInit(){
     this.currentFile = {
       index: 0,
       file: this.files[0]
     }
   }

   playStream(url){
     this.audioService.playStream(url).subscribe(event => {
       //lissen music
     })
   }

   openFile(file, index){
    this.currentFile = {index, file};
    this.audioService.stop();
    this.playStream(file.url);
   }

   play(){
     this.audioService.play();
   }

   pause(){
     this.audioService.pause();
   }

   stop(){
     this.audioService.stop();
   }

   next(){
     const index = this.currentFile.index + 1;
     const file = this.files[index];
     this.openFile(file, index);
   }

   previous(){
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }
  isLastPlaying() {
    return this.currentFile.index === this.files.length -1;
  }

  onSliderChangeEnd(change){
    this.audioService.seekTo(change.value)
  }


}
