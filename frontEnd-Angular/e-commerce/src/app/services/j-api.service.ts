import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JApiService {

  constructor(private http: HttpClient) { }


  getData (link: string) {
    return this.http.get(link);
  }


  postData (link: string, body: any) {
    return this.http.post(link, body);
  }
}
