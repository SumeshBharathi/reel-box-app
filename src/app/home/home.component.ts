import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movieSuggestions = new Subject<string>();
  showSearchLoader = false;
  searchBox: string;
  movieList = [];
  activeMovie = [];
  collection = [];

  constructor(
    private api: ApiService
  ) {
    this.showSearchLoader = true;
    this.movieSuggestions.pipe(
      debounceTime(1200),
      distinctUntilChanged())
      .subscribe(searchText => {
        if (searchText.length > 0) {
          this.getSearchSuggestions(searchText);
        }
      });
  }

  add(movie) {
    this.activeMovie = [];
    this.searchBox = '';
    this.movieList = [];
    this.collection.push({
      name: movie.title,
      language: movie.language,
      rating: movie.imdbrating
    });
  }

  getSearchSuggestions(searchText) {
    this.api.getApiCall(environment.apiBaseUrl + '/search_with_keyword?title=' + searchText).then(res => {
      console.log(Object(res).data);
      this.movieList = Object(res).data;
    }).catch(err => {
      console.log(err);
    });
  }

  showActiveMovie(item) {
    this.api.getApiCall(environment.apiBaseUrl + '/search_with_id?id=' + item.id).then(res => {
      console.log(Object(res).data);
      this.activeMovie = Object(res).data;
    }).catch(err => {
      console.log(err);
    });
  }

  removeFromCollection(argument) {
    this.collection.splice(argument, 1);
  }

  ngOnInit() {
  }

}

