import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISong } from '../../interfaces/iSong';
import { newSong } from '../../common/factories';
import { PlayerService } from '../../services/player.service';
import { faStepBackward, faStepForward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-play-music',
  templateUrl: './play-music.component.html',
  styleUrls: ['./play-music.component.scss']
})
export class PlayMusicComponent implements OnInit, OnDestroy {

  playSubscriptions: Array<Subscription> = [];
  music: ISong = newSong();
  previousIcon = faStepBackward;
  nextIcon = faStepForward;
  playIcon = faPlay;
  pauseIcon = faPause;
  onOff: boolean;

  constructor(
    private playerService: PlayerService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.getCurrentMusic();
  }

  getCurrentMusic() {
    const subs = this.playerService.currentMusic.subscribe(music => {
      this.music = music;
      return music
    });

    this.playSubscriptions.push(subs);
  }

  previousMusic() {
    this.playerService.previousMusicPlay();
  }

  playMusic(music: ISong) {
    if (!this.onOff) {
      this.spotifyService.playMusics(music.id);
      this.playerService.defineCurrentMusic(music);
      this.onOff = true;
    }
  }

  pauseMusic(music: ISong) {
    if (this.onOff) {
      this.spotifyService.pauseMusics(music.id);
      this.playerService.defineCurrentMusic(music);
      this.onOff = false;
    }
  }

  nextMusic() {
    this.playerService.nextMusicPlay();
  }

  ngOnDestroy(): void {
    this.playSubscriptions.forEach(sub => sub.unsubscribe());
  }



}
