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
  title: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    api.getApiCall(environment.apiBaseUrl + '/collections/' + this.route.snapshot.paramMap.get('id')).then(res => {
      if (Object(res).data === 'No collections found') {
        this.title = 'No collection found for the given url';
      } else {
        this.title = 'Have a look at ' + Object(res).data[0].user_name_ + `'s favourite movie collections`;
        this.collection = Object(res).data;
      }
    });
  }

  ngOnInit() {
  }

}
