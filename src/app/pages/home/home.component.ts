import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ISong } from 'src/app/interfaces/iSong';
import { SpotifyService } from '../../services/spotify.service';
import { PlayerService } from '../../services/player.service';
import { newSong } from '../../common/factories';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  playIcon = faPlay;
  musics: ISong[] = [];
  currentMusic: ISong = newSong();
  homeSubscriptions: Array<Subscription> = [];

  @Input()
  text: any = 1 | 2;


  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.getLikedSong();
    this.getCurrentMusic();
  }

  async getLikedSong() {
    this.musics = await this.spotifyService.searchLikedSongs();
  }

  getArtists(song: ISong) {
    return song.artists.map(artist => artist.name).join(', ');
  }

  async playMusic(music: ISong) {
      await this.spotifyService.playMusics(music.id);
      this.playerService.defineCurrentMusic(music);
  }

  async getCurrentMusic() {
    const subs = this.playerService.currentMusic.subscribe(music => {
      this.currentMusic = music;
    });

    this.homeSubscriptions.push(subs);
  }

  ngOnDestroy(): void {
    this.homeSubscriptions.forEach(sub => sub.unsubscribe());
  }
}

