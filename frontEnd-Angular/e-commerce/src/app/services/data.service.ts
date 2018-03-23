import { async } from '@angular/core/testing';
import { JApiService } from './j-api.service';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';


@Injectable()

export class DataService {
  message = '';
  messageType = '';
  user: any;

  constructor (private router: Router, private api: JApiService) {
    this.router.events.subscribe(
    event => {
       if (event instanceof NavigationStart) {
        this.message = '';
       }
      }
    );
   }

   error (message) {
    this.messageType = 'danger';
    this.message = message;
   }

   success (message) {
    this.messageType = 'success';
    this.message = message;
   }

   warning (message) {
     this.messageType = 'warning';
     this.message = message;
   }

   async getProfile () {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.api.getData('http://127.0.0.1:2018/api/account/profile');
        this.user = data['user'];
      }
    } catch (err) {
      this.error(err);
    }
   }

}
