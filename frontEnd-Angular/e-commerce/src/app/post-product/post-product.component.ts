import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
  product = {
   title: '',
   price: 0,
   description: '',
   categoryId: '',
   product_image: null
  };
  categories: any;
  btnDisabled = false;

  constructor(private router: Router, private data: DataService, private api: JApiService) { }

 async ngOnInit() {
   try {
    const data = await this.api.getData('http://127.0.0.1:2018/api/categories');
    if (data['success']) {
      this.categories = data['category'];
    } else {
      this.data.error(data['message']);
    }
   } catch (err) {
     this.data.error(err['message']);
   }
  }


  validate (product) {
    if (product.title) {
      if (product.price) {
        if (product.description) {
          if (product.categoryId) {
            if (product.product_image ) {
              return true;
            } else {
              this.data.error('Please select an image');
            }
          } else {
            this.data.error('Please add a category');
          }
        } else {
          this.data.error('Please add a description');
        }
      } else {
        this.data.error('Please add a price');
      }
    } else {
      this.data.error('Please add a title');
    }
  }

  fileChange (event: any) {
   this.product.product_image = event.target.files[0];
  }

  async addProduct () {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === 'product_image') {
                form.append('product_image', this.product.product_image, this.product.product_image.name);
            } else {
              form.append(key, this.product[key]);
            }
          }
        }

        const data = await this.api.postData('http://127.0.0.1:2018/api/seller/products', form);
        if (data['success']) {
          this.data.success(data['message']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (err) {
      this.data.error(err['message']);
    }
    this.btnDisabled = false;
  }

}
