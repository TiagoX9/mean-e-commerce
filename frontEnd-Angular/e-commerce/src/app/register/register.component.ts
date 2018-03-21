import { Router } from '@angular/router';
import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = false;
  btnDisabled = false;


  constructor (private data: DataService, private api: JApiService, private router: Router) { }

  ngOnInit() {
  }

  validate () {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.error('Passwords do not match');
            }
          } else {
            this.data.error('Password must be confirmed');
          }
        } else {
          this.data.error('Password is required');
        }
      } else {
        this.data.error('Email is requred');
      }

    } else {
      this.data.error('Name is required');
    }
  }


 async register () {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const link = 'http://127.0.0.1:2018/api/account/signup';
        const data = await this.api.postData(link,
          {
          name: this.name,
          password: this.password,
          email: this.email,
          isSeller: this.isSeller
        }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Succesfully registered');
          this.router.navigate(['/']);
        } else {
          this.data.error(data['message']);
        }

      }
    } catch (error) {
      console.log('succes');
      this.data.error(error['message']);
    }

    this.btnDisabled = false;
  }

}
