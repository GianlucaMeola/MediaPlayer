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
  public volume: number = 0.75;
  public veritcalSlider: boolean = true;


  constructor(public audioService: AudioService, public cloudService: CloudService) {
    cloudService.getFiles().subscribe( files => {
      this.files = files;
    });

    this.audioService.getState().subscribe( state => {
      this.state = state;
    });
   }

   ngOnInit(){
    this.initFirst();
   }

   playStream(url){
     this.audioService.playStream(url).subscribe(event => {
       //lissen music
     })
   }
   
   initFirst(){
    this.openFile(this.files[0], 0);
    this.pause();
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
    let index = !this.isLastPlaying() ? this.currentFile.index + 1 : 0;
    const file = this.files[index];
    this.openFile(file, index);
   }

   previous(){
    const index = !this.isFirstPlaying() ? this.currentFile.index - 1 : this.files.length - 1;
    const file = this.files[index];
    this.openFile(file, index);
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

  onVolumeChange(change){
    this.audioService.setVolume(change.value)
  }

}
