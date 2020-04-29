import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getApiCall(apiUrl): Promise<void | object> {
    return this.http.get(apiUrl).toPromise().then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  }
}
