import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;

  constructor(private data: DataService, private api: JApiService) { }

 async ngOnInit () {
    try {
      if (!this.data.user ) {
        await this.data.getProfile();
      }
      this.currentSettings = Object.assign({
        newPassword: '',
        passwordConfirm: ''
      }, this.data.user);
    } catch (err) {
      this.data.error(err);
    }
  }
// this is the worst if else codes ever I did, yes I'm too lazy to create Reactive form for validation :)
  validate (settings) {
    if (settings['name']) {
      if (settings['email']) {
        if (settings['newPassword']) {
          if (settings['passwordConfirm']) {
            if (settings['newPassword'] === settings['passwordConfirm']) {
              return true;
            } else {
              this.data.error(`your passwords don't love each other`);
            }
          } else {
            this.data.error('Please add a confirmation password');
          }
        } else {
          if (!settings['passwordConfirm']) {
            return true;
          } else {
            this.data.error('Please add a new password');
          }
        }
      } else {
        this.data.error('Please enter your email');
      }
    } else {
      this.data.error('Please enter your name');
    }
  }

  async update () {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)) {
        const data = await this.api.postData('http://127.0.0.1:2018/api/account/profile', {
          name: this.currentSettings['name'],
          email: this.currentSettings['email'],
          password: this.currentSettings['newPassword'],
          isSeller: this.currentSettings['isSeller']
        });

        data['success'] ? (this.data.getProfile(), this.data.success(data['message']))
          : this.data.error(data['message']);
      }
    } catch (err) {
      this.data.error(err['message']);
    }

    this.btnDisabled = false;
  }

}
