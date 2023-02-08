import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {

  constructor(
    private router: Router,
    private spotifyService: SpotifyService
  ) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if (!token) {
      this.notAuthenticated();
    }
    return new Promise(async (res) => {
      const userCreated = await this.spotifyService.initializeUser();
      if (userCreated) {
        res(true);
      } else {
        res(this.notAuthenticated());
      }
    })
    return true
  }

  notAuthenticated() {
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

}