import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'movie-challenge-app';
  constructor (
    private router: Router
  ) { }

  ngOnInit () {
    // TODO: have to add one more condition for collection listing page
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/signup']);
    }
  }
}
