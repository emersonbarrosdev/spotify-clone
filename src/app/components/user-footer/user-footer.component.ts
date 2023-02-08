import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { iUser } from '../../interfaces/iUser';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.scss']
})
export class UserFooterComponent implements OnInit {

  signOutAltIcon = faSignOutAlt;
  user: iUser = null;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.user = this.spotifyService.user;
  }

  userLogout() {
    this.spotifyService.logout();
  }

}
