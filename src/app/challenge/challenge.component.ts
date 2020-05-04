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
  showSpinnerCollection = true;
  collection: any;
  title = 'Have a look at my favourite movie collections';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
    api.getApiCall(environment.apiBaseUrl + '/collections/' + this.route.snapshot.paramMap.get('id')).then(res => {
      if (Object(res).data === 'No collections found') {
        this.title = 'No collection found for the given url';
      } else {
        this.collection = Object(res).data;
        this.showSpinnerCollection = false;
      }
    });
  }

  ngOnInit() {
  }

}
