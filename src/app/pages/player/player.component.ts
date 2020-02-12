import { Component, OnInit } from '@angular/core';
import {AudioService} from '../../services/audio.service';
import {CloudService} from '../../services/cloud.service';
import {StreamState} from '../../interfaces/stream-state';
import {FileDetails} from '../../interfaces/music-file';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{

  files: Array<FileDetails> = [];
  state: StreamState;
  currentFile: any = {};
  public volume: number = 1;
  public veritcalSlider: boolean = true;
  public displayVolume = false;
  public isLoopPlaying: boolean = true;

  constructor(public audioService: AudioService, public cloudService: CloudService) {
    this.audioService.getState().subscribe( state => {
      this.state = state;
    });
   }

  ngOnInit(){
    this.loadMusic();
   }

   async loadMusic(){
    (await this.cloudService.getFiles()).subscribe( files => {
      this.files = files;
    });
   }

   playStream(uri){
     this.audioService.playStream(uri).subscribe(event => {
      if(this.state.ended && this.isLoopPlaying) {this.next(); this.state.ended = false}
     })
   }

   openFile(musicFile, index){
    this.currentFile = {index, musicFile};
    this.audioService.stop();
    this.playStream(musicFile.uri);
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
    let index = !this.isLastPlaying() ? this.currentFile.index + 1 : 0;
    const musicFile = this.files[index];
    this.openFile(musicFile, index);
   }

   previous(){
    const index = !this.isFirstPlaying() ? this.currentFile.index - 1 : this.files.length - 1;
    const musicFile = this.files[index];
    this.openFile(musicFile, index);
  }

  toggleLoopPlay(){
    this.isLoopPlaying = !this.isLoopPlaying;
    return this.isLoopPlaying;
  }

  isFirstPlaying(): boolean {
    return this.currentFile.index === 0;
  }

  isLastPlaying(): boolean {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change){
    this.audioService.seekTo(change.value)
  }

  displayVolumeControl(){
    this.displayVolume = !this.displayVolume;
  }

  onVolumeChange(change){
    this.audioService.setVolume(change.value)
  }

}
