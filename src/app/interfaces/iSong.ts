export interface ISong {
  id: string;
  title: string;
  duration: string;
  album: {
    id: string;
    name: string;
    imageUrl: string;
  },
  artists: {
    id: string;
    name: string;
  }[],
}