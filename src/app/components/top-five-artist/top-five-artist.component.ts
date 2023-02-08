import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-top-five-artist',
  templateUrl: './top-five-artist.component.html',
  styleUrls: ['./top-five-artist.component.scss']
})
export class TopFiveArtistComponent implements OnInit {

  @Input()
  image: string;

  @Output()
  artistClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  getArtist() {
    this.artistClick.emit();
  }
}
