import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
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
    this.collection.push({
      name: movie.title,
      language: movie.language,
      rating: movie.imdbrating
    });
  }

  createCollection(collection) {
    console.log('collection', collection);
    const data = {
      collection: collection
    };

    this.api.postApiCall(environment.apiBaseUrl + '/create_collection', data).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
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
  closeResult = 'a';
  open(content,item) {
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


  ngOnInit() {
  }

}

