import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class JApiService {

  constructor(private http: HttpClient) { }

  getHeaders () {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  // I don't recommend to use Promises over Observables. I was just testing out.
  getData (link: string) {
    return this.http.get(link, { headers: this.getHeaders() }).toPromise();
  }
  
  
  // Observables rocks ^^
  postData (link: string, body: any) {
    return this.http.post(link, body, { headers: this.getHeaders() }).toPromise();
  }

  deleteData (link: string) {
    return this.http.delete(link, { headers: this.getHeaders() } );
  }

}
