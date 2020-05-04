import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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
  showSearchLoader = false;
  searchBox: string;
  movieList = [];
  activeMovie = [];
  collection = [];

  constructor(
    private api: ApiService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.showSearchLoader = true;
    this.movieSuggestions.pipe(
      debounceTime(1200))
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
    
    let actor;
    if (movie.actors) {
      actor = movie.actors[0];
    }

    let director;
    if (movie.director) {
      director = movie.director[0];
    };

    let genres = '';
    if (movie.genre) {
      for (let i = 0; i < Object.keys(movie.genre).length; i++) {
        genres += movie.genre[i] + ',';
      };
      genres = genres.substring(0, genres.length - 1);
    }

    this.collection.push({
      name: movie.title,
      language: movie.language,
      rating: movie.imdbrating,
      year: movie.year,
      actors: actor,
      directors: director,
      plot: movie.plot,
      runtime: movie.runtime,
      genre: genres,
      awards: movie.awards,
      poster: movie.poster
    });
  }

  createCollection(collection) {
    console.log('collection', collection);
    const data = {
      collection: collection
    };

    this.api.postApiCall(environment.apiBaseUrl + '/create_collection', data).then(res => {
      console.log(res);
      if (Object(res).msg === 'Collection created' && Object(res).id) {
        this.router.navigate(['/share/' + Object(res).id]);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  getSearchSuggestions(searchText) {
    document.getElementById('spin').style.display = 'initial';
    this.api.getApiCall(environment.apiBaseUrl + '/search_with_keyword?title=' + searchText).then(res => {
      console.log(Object(res).data);
      this.movieList = Object(res).data;
    }).catch(err => {
      console.log(err);
    });
    this.spin();

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
  closeResult = 'a';
  open(content, item) {
    this.showActiveMovie(item);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  spin() {
    setTimeout(() => {
      document.getElementById('spin').style.display = 'none';
    },
      2000);
  }


  ngOnInit() {
  }

}

