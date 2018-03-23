import { DataService } from './../services/data.service';
import { JApiService } from './../services/j-api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  btnDisabled = false;

  constructor (private router: Router, private api: JApiService, private data: DataService) { }

  ngOnInit() {
  }

  validate() {
    if (this.email) {
       if (this.password ) {
         return true;
       } else {
         this.data.error('Password is required');
       }
    } else {
      this.data.error('Email is required');
    }
  }

 async login () {
   this.btnDisabled = true;
   try {

    if (this.validate()) {
      const link = `http://127.0.0.1:2018/api/account/login`;
      const data  = await this.api.postData(link,
        { email: this.email, password: this.password }
      );
      if (data['success']) {
        localStorage.setItem('token', data['token']);
        await this.data.getProfile();
        this.router.navigate(['/']);
      } else {
        this.data.error(data['message']);
      }
    }

   } catch (error) {
    this.data.error(error['message']);
   }
   this.btnDisabled = false;
 }

}
