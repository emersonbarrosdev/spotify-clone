import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faGuitar, faMusic, faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from '../../interfaces/iPlaylist';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  selectedMenu = 'Home';

  homeIcon = faHome;
  searchIcon = faSearch;
  artistIcon = faGuitar;
  playListIcon = faMusic;

  playlists: IPlaylist[] = [];

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchPlaylists();
  }

  clickButton(onButton: string) {
    this.selectedMenu = onButton;
    this.router.navigateByUrl('player/home')
  }

  onPlaylist(playlistId: string) {
    this.selectedMenu = playlistId;
    this.router.navigateByUrl(`player/playlist/playlist/${playlistId}`)
  }

  async searchPlaylists() {
    this.playlists = await this.spotifyService.searchUserPlaylist();
  }

}
