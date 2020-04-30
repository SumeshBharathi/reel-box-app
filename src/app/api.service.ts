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

  postApiCall(apiUrl, payload): Promise<void | object> {
    const token = localStorage.getItem('token');
    let httpOptions;
    if (token !== null) {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': token
        })
      };
    } else {
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }

    return this.http.post(apiUrl, payload, httpOptions).toPromise().then(res => {
      return res;
    }).catch(err => {
      return err;
    });
  }
}
