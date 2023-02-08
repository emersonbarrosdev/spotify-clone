import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { iUser } from '../interfaces/iUser';
import { SpotifyUsers, SpotifyPlaylists, SpotifyArtists, SpotifyTrackSongs, SpotifySinglePlaylists } from '../common/spotify.helper';
import { IPlaylist } from '../interfaces/iPlaylist';
import { Router } from '@angular/router';
import { IArtists } from '../interfaces/iArtists';
import { ISong } from '../interfaces/iSong'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs;
  user?: iUser;

  constructor(
    private router: Router
  ) {
    this.spotifyApi = new Spotify();
  }

  async initializeUser() {
    if (!!this.user)
      return true;

    const token = localStorage.getItem('token');

    if (!token)
      return false;

    try {
      this.defineAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;

    } catch (ex) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userDetails = await this.spotifyApi.getMe();
    this.user = SpotifyUsers(userDetails);
  }

  getLoginUrl() {
    const authEndPoint = `${SpotifyConfiguration.authEndPoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;

    return authEndPoint + clientId + redirectUrl + scopes + responseType;
  }

  getTokenCallbackUrl() {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  defineAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async searchUserPlaylist(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylists);
  }

  async searchFavoriteArtists(limit = 10): Promise<IArtists[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtists);
  }

  async searchLikedSongs(offset = 0, limit = 50): Promise<ISong[]> {
    const songs = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return songs.items.map(x => SpotifyTrackSongs(x.track));
  }

  async playMusics(musicId: string) {
      await this.spotifyApi.queue(musicId);
      await this.spotifyApi.skipToNext();
  }

  async pauseMusics(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.pause();
  }

  async getCurrentMusic(): Promise<ISong> {
    const spotifyMusic = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackSongs(spotifyMusic.item);
  }

  async previousMusicSpotify() {
    this.spotifyApi.skipToPrevious();
  }

  async nextMusicSpotify() {
    this.spotifyApi.skipToNext();
  }

  async getMusicPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify) {
      return null;
    }
    const playlist = SpotifySinglePlaylists(playlistSpotify);
    const musicSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musics = musicSpotify.items.map(music =>
      SpotifyTrackSongs(music.track as SpotifyApi.TrackObjectFull));
    return playlist;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
