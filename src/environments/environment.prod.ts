export const environment = {
  production: true
};

export const SpotifyConfiguration = {
  clientId: '8c8c0f0aabf6447191b8e4b990f6931e',
  authEndPoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'https://spotify-clone-gamma-pink.vercel.app/login/',
  scopes: [
    "user-read-currently-playing", // musica tocando agora.
    "user-read-recently-played", // ler musicas tocadas recentemente
    "user-read-playback-state", // ler estado do player do usuario
    "user-top-read", // top artistas e musicas do usuario
    "user-modify-playback-state", // alterar do player do usuario.
    "user-library-read", // ler biblioteca dos usuarios
    "playlist-read-private", // ler playlists privads
    "playlist-read-collaborative" // ler playlists colaborativas
  ]
}
