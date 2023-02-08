import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { newSong } from '../common/factories';
import { ISong } from '../interfaces/iSong';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentMusic = new BehaviorSubject<ISong>(newSong());
  timerId: any = null;

  constructor(
    private spotifyService: SpotifyService
  ) { 
    this.getCurrentSong();
  }

  async getCurrentSong() {
    clearTimeout(this.timerId);
    const music = await this.spotifyService.getCurrentMusic();
    this.defineCurrentMusic(music);
    this.timerId = setInterval(async() => {
      this.getCurrentSong();
    }, 2000);
  }

  defineCurrentMusic(music: ISong) {
    this.currentMusic.next(music);
  }

  async previousMusicPlay() {
    await this.spotifyService.previousMusicSpotify();
  }

  async nextMusicPlay() {
    await this.spotifyService.nextMusicSpotify();
  }
}
