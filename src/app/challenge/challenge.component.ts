import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {

  collection: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    api.getApiCall(environment.apiBaseUrl + '/collections/' + this.route.snapshot.paramMap.get('id')).then(res => {
      console.log(res);
      this.collection = Object(res).data;
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
