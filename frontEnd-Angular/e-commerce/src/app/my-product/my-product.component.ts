import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-product',
  templateUrl: './my-product.component.html',
  styleUrls: ['./my-product.component.scss']
})
export class MyProductComponent implements OnInit {
  products: any;

  constructor(private data: DataService, private api: JApiService, private router: Router) { }

   async ngOnInit() {
     console.log(this.products);
    try {
      const data = await this.api.getData('http://127.0.0.1:2018/api/seller/products');
      if (data['success']) {
        this.products = data['products'];
        console.log(data);
      } else {
        this.data.error(data['message']);
      }
    } catch (err) {
      this.data.error(err['message']);
    }
  }

  onDelete(product) {
    const url = `http://localhost:2018/api/product/${product._id}`;
    this.products.forEach(pro => {
      pro = this.products.splice(this.products.indexOf(product, 1));
    });
  }

}


