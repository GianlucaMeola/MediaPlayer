import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject, Subject, from} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import{StreamState} from '../interfaces/stream-state';
import { StepState } from '@angular/cdk/stepper';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private state: StreamState = this.resetState();

private stop$ = new Subject();
private audioObj = new Audio();
audioEvents = [
  'ended',
  'error',
  'play',
  'playing',
  'pause',
  'timeupdate',
  'canplay',
  'loadedmetadata',
  'loadstart'
]

playStream(url){
  return this.streamObservable(url).pipe(takeUntil(this.stop$))
}

private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
  this.state
);

getState(): Observable<StreamState> {
  return this.stateChange.asObservable();
}

play() {
  this.audioObj.play();
}

pause() {
  this.audioObj.pause();
}

stop() {
  this.stop$.next();
}

seekTo(seconds) {
  this.audioObj.currentTime = seconds;
}

private streamObservable(url):any{
  return new Observable( observer => {
    this.loadAndPlay(url);

    const handler = (event: Event) => {
      this.updateStateEvents(event);
      observer.next(event);
    };
    
  this.addEvents(this.audioObj, this.audioEvents, handler);

  return() => {
    this.stopPlaying();
    this.removeEvents(this.audioObj, this.audioEvents, handler);
    this.resetState();
  }
  });
}

private addEvents(obj, events, handler) {
  events.forEach(event => {
    obj.addEventListener(event, handler);
  });
}

private updateStateEvents(event: Event): void {
  switch (event.type) {
    case "canplay":
      this.state.duration = this.audioObj.duration;
      this.state.readableDuration = this.formatTime(this.state.duration);
      this.state.canplay = true;
      break;
    case "playing":
      this.state.playing = true;
      break;
    case "pause":
      this.state.playing = false;
      break;
    case "timeupdate":
      this.state.currentTime = this.audioObj.currentTime;
      this.state.readableCurrentTime = this.formatTime(
        this.state.currentTime
      );
      break;
    case "error":
      this.state = this.resetState();
      this.state.error = true;
      break;
  }
  this.stateChange.next(this.state);
}

private removeEvents(obj, events, handler) {
  events.forEach(event => {
    obj.removeEventListener(event, handler);
  });
}

private loadAndPlay(url){
  this.audioObj.src = url;
  this.audioObj.load();
  this.audioObj.play();
}

private stopPlaying(){
  this.audioObj.pause();
  this.audioObj.currentTime = 0;
}

private resetState(): StreamState {
  return{
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  };
}

formatTime(time: number, format: string = "HH:mm:ss") {
  const momentTime = time * 1000;
  return moment.utc(momentTime).format(format);
}

}
