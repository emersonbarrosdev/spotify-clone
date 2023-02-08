import { iUser } from '../interfaces/iUser';
import { IPlaylist } from '../interfaces/iPlaylist';
import { IArtists } from '../interfaces/iArtists';
import { ISong } from '../interfaces/iSong';
import { addMilliseconds, format } from 'date-fns';
import { newSong, newPLaylist } from './factories';

export function SpotifyUsers(user: SpotifyApi.CurrentUsersProfileResponse): iUser {
  return {
    id: user.id,
    name: user.display_name,
    imageUrl: user.images.pop().url
  }
}

export function SpotifyPlaylists(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop().url
  }
}

export function SpotifySinglePlaylists(playlist: SpotifyApi.SinglePlaylistResponse): IPlaylist {
  if (!playlist) {
    return newPLaylist();
  }

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    musics: []
  }
}

export function SpotifyArtists(artist: SpotifyApi.ArtistObjectFull): IArtists {
  return {
    id: artist.id,
    name: artist.name,
    imageUrl: artist.images.sort((a, b) => a.width - b.width).pop().url
  }
}

export function SpotifyTrackSongs(song: SpotifyApi.TrackObjectFull): ISong {
  if (!song)
    return newSong();

  const inMinutes = (ms: number) => {
    const date = addMilliseconds(new Date(0), ms);
    return format(date, 'mm:ss');
  }

  return {
    id: song.uri,
    title: song.name,
    duration: inMinutes(song.duration_ms),
    album: {
      id: song.id,
      name: song.album.name,
      imageUrl: song.album.images.shift().url,
    },
    artists: song.artists.map(music => ({
      id: music.id,
      name: music.name
    })),
  }
}