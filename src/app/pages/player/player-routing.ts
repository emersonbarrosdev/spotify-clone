import { Routes } from '@angular/router';
import { PlayerComponent } from './player.component';
import { HomeComponent } from '../home/home.component';
import { PlaylistsComponent } from '../playlists/playlists.component';

export const playerRoutes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'playlist/:type/:id',
        component: PlaylistsComponent
      }
    ]
  }
];
