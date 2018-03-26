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

}
