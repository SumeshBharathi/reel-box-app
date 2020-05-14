import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  movieSuggestions = new Subject<string>();
  showSearchSpinner = false;
  showSpinner = false;
  searchBox: string;
  movieList = [];
  activeMovie = [];
  collection = [];

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.movieSuggestions.pipe(
      debounceTime(1200))
      .subscribe(searchText => {
        if (searchText.length > 2) {
          this.showSearchSpinner = true;
          this.getSearchSuggestions(searchText);
        }
      });
  }

  addToList(movie) {
    this.activeMovie = [];
    this.searchBox = '';
    this.movieList = [];

    this.collection.push({
      name: movie.title,
      language: movie.language,
      rating: movie.imdbrating,
      year: movie.year,
      actors: movie.actor,
      directors: movie.director,
      plot: movie.plot,
      runtime: movie.runtime,
      awards: movie.awards,
      poster: movie.poster
    });
  }

  createCollection(collection) {
    this.showSpinner = true;
    const data = {
      collection: collection
    };

    this.api.postApiCall(environment.apiBaseUrl + '/create_collection', data).then(res => {
      if (Object(res).msg === 'Collection created' && Object(res).id) {
        this.router.navigate(['/share/' + Object(res).id]);
      }
    });
  }

  getSearchSuggestions(searchText) {
    this.api.getApiCall(environment.apiBaseUrl + '/search_with_keyword?title=' + searchText).then(res => {
      this.showSearchSpinner = false;
      this.movieList = Object(res).data;
    }).catch(err => {
      this.showSearchSpinner = false;
    });
  }

  showActiveMovie(item): Promise<any> {
    this.activeMovie = [];
    if (item.id !== 'not found') {
      return this.api.getApiCall(environment.apiBaseUrl + '/search_with_id?id=' + item.id).then(res => {
        this.activeMovie = Object(res).data;
        Object(this.activeMovie[0]).director = Object(res).data[0].director[0];
        Object(this.activeMovie[0]).actor = Object(res).data[0].actors[0];

        return this.activeMovie;
      });
    }
  }

  removeFromCollection(argument) {
    this.collection.splice(argument, 1);
  }

  openPopup(content, item) {
    this.movieList = [];
    this.searchBox = '';
    this.showActiveMovie(item).then(() => {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result;
    });
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/signup']);
    }
  }

}

