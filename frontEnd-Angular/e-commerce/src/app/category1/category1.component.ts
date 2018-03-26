import { DataService } from './../services/data.service';
import { JApiService } from './../services/j-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category1',
  templateUrl: './category1.component.html',
  styleUrls: ['./category1.component.scss']
})
export class Category1Component implements OnInit {
  categoryId: any;
  category: any;
  page = 1;

  constructor(private route: ActivatedRoute, private api: JApiService, private data: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.categoryId = res['id'];
      this.getProducts();
    });
  }

  get lower () {
    return 10 * (this.page - 1) + 1;
  }

  get upper () {
    return Math.min(10 * this.page, this.category.totalProducts);
  }


  async getProducts (e ?: any) {
      if (e) {
        this.category = null;
      }

      try {
        const data = await this.api.getData(`http://127.0.0.1:2018/api/categories/${this.categoryId}?page=${this.page - 1}`);
        if (data['success']) {
          this.category = data;
        } else {
          this.data.error(data['message']);
        }

      } catch (err) {
        this.data.error(err['message']);
      }
  }
}
