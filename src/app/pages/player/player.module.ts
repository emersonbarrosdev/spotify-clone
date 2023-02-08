import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { playerRoutes } from './player-routing';
import { RouterModule } from '@angular/router';
import { LeftPanelComponent } from '../../components/left-panel/left-panel.component';
import { ButtonMenuComponent } from '../../components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFooterComponent } from '../../components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistsComponent } from '../../components/top-artists/top-artists.component';
import { RightPanelComponent } from '../../components/right-panel/right-panel.component';
import { RecentSearchComponent } from '../../components/recent-search/recent-search.component';
import { FavoriteArtistsComponent } from '../../components/favorite-artists/favorite-artists.component';
import { TopFiveArtistComponent } from '../../components/top-five-artist/top-five-artist.component';
import { PlayMusicComponent } from '../../components/play-music/play-music.component';
import { PlaylistsComponent } from '../playlists/playlists.component';
import { BannerComponent } from '../../components/banner/banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild(playerRoutes),
    ReactiveFormsModule

  ],
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    ButtonMenuComponent,
    UserFooterComponent,
    HomeComponent,
    TopArtistsComponent,
    RightPanelComponent,
    RecentSearchComponent,
    FavoriteArtistsComponent,
    TopFiveArtistComponent,
    PlayMusicComponent,
    PlaylistsComponent,
    BannerComponent,
  ]
})
export class PlayerModule { }
