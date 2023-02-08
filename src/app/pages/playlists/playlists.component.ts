import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISong } from '../../interfaces/iSong';
import { newSong } from '../../common/factories';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  playlistSubscriptions: Array<Subscription> = [];;

  bannerImage = '';
  bannertext = '';

  playlist: ISong[] = [];
  currentMusic: ISong = newSong();
  playIcon = faPlay;

  title: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.getMusics();
    this.getCurrentMusic();
  }

  getMusics() {
    const sub = this.activatedRoute.paramMap.subscribe(async element => {
      const type = element.get('type');
      const id = element.get('id');
      await this.getPageData(type, id);
    });
    this.playlistSubscriptions.push(sub);
  }

  getCurrentMusic() {
    const subs = this.playerService.currentMusic.subscribe(music => {
      this.currentMusic = music;
    });

    this.playlistSubscriptions.push(subs);
  }

  async getPageData(type: string, id: string) {
    if (type === 'playlist') {
      await this.getPlaylistData(id);
    } else {
      await this.getArtistData(id);
    }
  }

  async getPlaylistData(playlistId: string) {
    const playlistMusics = await this.spotifyService.getMusicPlaylist(playlistId);
    this.setPageData(playlistMusics.imageUrl, playlistMusics.name, playlistMusics.musics);
    this.title = 'Músicas Playlist: ' + playlistMusics.name;
  }

  async getArtistData(artistId: string) {

  }

  setPageData(image: string, text: string, musics: ISong[]) {
    this.bannerImage = image;
    this.bannertext = text;
    this.playlist = musics;
   }

   async playMusic(music: ISong) {
    await this.spotifyService.playMusics(music.id);
    this.playerService.defineCurrentMusic(music);
  }

  getArtists(song: ISong) {
    return song.artists.map(artist => artist.name).join(', ');
  }

  ngOnDestroy(): void {
    this.playlistSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
