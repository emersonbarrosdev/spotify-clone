import { Component, OnInit } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { SpotifyService } from '../../services/spotify.service';
import { IArtists } from '../../interfaces/iArtists';
import { newArtists } from '../../common/factories';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.scss']
})
export class TopArtistsComponent implements OnInit {

  myArtists: IArtists = newArtists();

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.searchMyArtists();
  }

  async searchMyArtists() {
    const artists = await this.spotifyService.searchFavoriteArtists(1);

    if(!!artists) {
      this.myArtists = artists.pop();
    }
  }

}
