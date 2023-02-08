import { ISong } from './iSong';

export interface IArtists {
  id: string;
  name: string;
  imageUrl: string;
  musics?: ISong[];
}