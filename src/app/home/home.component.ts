import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  searchBox: any;
  movieList: any;
  activeMovie = [];

  constructor(
    private api: ApiService
  ) {
    this.showSearchLoader = true;
    this.movieSuggestions.pipe(
      debounceTime(1200),
      distinctUntilChanged())
      .subscribe(searchText => {
        if (searchText.length > 0) {
          console.log('val', searchText);
          this.getSearchSuggestions(searchText);
        }
      });
  }

    // temp will be the selected array from api
    temp = { id: 'Aadhi', name: 'Dr Nice' };
    arr = [
      { id: 'Aadhi', name: 'Dr Nice' },
      { id: 'Payanam', name: 'Narco' },
      { id: 'sd', name: 'Bombasto' },
      { id: 'sfdsf', name: 'Celeritas' },
      { id: 'dfdd', name: 'Magneta' },
    ];
  
    add() {
      let flag = 1;
      for (let i of this.arr) {
        if (this.temp.id === i.id) {
          flag = 0;
        }
      }
      if (flag && this.arr.length < 5) {
        this.arr.push(this.temp);
      } else {
        console.log('Repeated | limit exceeded');
      }
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
      this.activeMovie.push(Object(res).data);
    }).catch(err => {
      console.log(err);
    });
  }

  remove(arg) {
    this.arr.splice(arg, 1);
    console.log(arg);
    console.log(this.arr);
  }


  ngOnInit() {
  }

}

