import { DataService } from './../services/data.service';
import { JApiService } from './../services/j-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: any;

  myReview = {
    title: '',
    description: '',
    rating: 0
  };
  btnDisabled = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private api: JApiService, private data: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      const resId = res['id'];
      this.api.getData(`http://127.0.0.1:2018/api/product/${resId}`)
        .then(data => {
          if (data['success']) {
            this.product = data['product'];
          } else {
            this.router.navigate(['/']);
          }
        })
        .catch(err => this.data.error(err['message']));

    });
  }


 async postReview () {
  this.btnDisabled = true;

  try {
    const data = await this.api.postData(`http://localhost:2018/api/review`, {
      productId: this.product._id,
      title: this.myReview.title,
      description: this.myReview.description,
      rating: this.myReview.rating
    });

     data['success'] ? this.data.success(data['message']) : this.data.error(data['message']);

  } catch (err) {
    this.data.error(err['message']);
  }

  this.btnDisabled = false;
  }

}
