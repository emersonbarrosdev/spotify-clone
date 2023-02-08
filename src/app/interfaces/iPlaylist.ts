import { ISong } from './iSong';
export interface IPlaylist {
  id: string;
  name: string;
  imageUrl: string;
  musics?: ISong[];
}