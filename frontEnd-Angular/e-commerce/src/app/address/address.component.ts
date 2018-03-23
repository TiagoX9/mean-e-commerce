import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled = false;
  currentAddress: any;

  constructor(private data: DataService, private api: JApiService, private router: Router) { }

  async ngOnInit() {
  try {
      const data = await this.api.getData('http://127.0.0.1:2018/api/account/address');

      if ( JSON.stringify(data['address']) === '{ }' && this.data.message === '') {
        this.data.warning('Shipping address has not been entered. Please enter your shipping address');
      }
      this.currentAddress = data['address'];
      console.log('got the address');

  } catch (err) {
    this.data.error(err['message']);
  }
  }

  async updateAddress () {
    this.btnDisabled = true;
    try {
      const send = await this.api.postData('http://127.0.0.1:2018/api/account/address', this.currentAddress);

      send['success'] ? (this.data.success(send['message']), await this.data.getProfile())
        : this.data.error(send['message']);

      this.router.navigate(['/profile']);
    } catch (err) {
      this.data.error(err['message']);
    }

    this.btnDisabled = false;
  }

}
