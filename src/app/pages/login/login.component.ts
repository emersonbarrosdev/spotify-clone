import { Component, OnInit } from '@angular/core';
import { TitleStrategy, Route, Router } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.verifyTokenCallbackUrl();
  }

  verifyTokenCallbackUrl() {
    const token = this.spotifyService.getTokenCallbackUrl();
    if (!!token) {
      this.spotifyService.defineAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  enterSpotify() {
    window.location.href = this.spotifyService.getLoginUrl();
  }

}
