import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { IArtists } from '../../interfaces/iArtists';

@Component({
  selector: 'app-favorite-artists',
  templateUrl: './favorite-artists.component.html',
  styleUrls: ['./favorite-artists.component.scss']
})
export class FavoriteArtistsComponent implements OnInit {

  artists: IArtists[] = [];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.getFavoriteArtists();
  }

  async getFavoriteArtists(){
    this.artists = await this.spotifyService.searchFavoriteArtists(5);
    
  }

}
