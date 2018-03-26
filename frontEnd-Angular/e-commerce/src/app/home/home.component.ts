import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: any;

  constructor(private data: DataService, private api: JApiService) { }

 async ngOnInit() {
    try {
      const data = await this.api.getData('http://127.0.0.1:2018/api/products');
      if (data['success']) {
        this.products = data['products'];
      } else {
        this.data.error('something went wrong..');
      }
    } catch (err) {
      this.data.error(err['message']);
    }
  }

}
