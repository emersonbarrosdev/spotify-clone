import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {

  recentSearch = [
    'Rock Anos 2000',
    'Rock Anos 80',
    'As Melhores Slipknot',
    'Top Brasil',
    'Top Global'
  ];

  searchField: string;

  constructor() { }

  ngOnInit() {
  }

  setSearch(search: string) {
    this.searchField = search;
  }

  getSearch(){
    console.log('Buscando...', this.searchField);
    
  }
}
