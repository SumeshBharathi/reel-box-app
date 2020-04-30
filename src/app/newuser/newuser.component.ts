import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  name: string;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  createUser () {
    this.api.postApiCall(environment.apiBaseUrl + '/new_user', {name: this.name}).then(res => {
      console.log(res);
      if (res && Object(res).msg === 'User created') {
        localStorage.setItem('token', Object(res).token);
        this.router.navigate(['/']);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
