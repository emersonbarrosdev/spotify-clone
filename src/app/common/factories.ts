import { IArtists } from '../interfaces/iArtists';
import { ISong } from '../interfaces/iSong';
import { IPlaylist } from '../interfaces/iPlaylist';

export function newArtists(): IArtists {
  return {
    id: '',
    name: '',
    imageUrl: '',
    musics: []
  }
}

export function newSong(): ISong {
  return {
    id: '',
    title: '',
    duration: '',
    artists: [],
    album: {
      id: '',
      name: '',
      imageUrl: '',
    },
  }
}

export function newPLaylist(): IPlaylist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    musics: [],
  }
}