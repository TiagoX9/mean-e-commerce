import { Router } from '@angular/router';
import { JApiService } from './../services/j-api.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any;
  newCategory = '';
  btnDisabled = false;

  constructor(private data: DataService, private api: JApiService, private router: Router) { }

 async ngOnInit() {

      try {
        const data = await this.api.getData('http://127.0.0.1:2018/api/categories');

        if (data['success']) {
          this.categories = data['category'];
        } else { this.data.error(data['message']); }

      } catch (err) {
        this.data.error(err['message']);
      }
  }

  async addCategory () {
    this.btnDisabled = true;
      try {
        const data = await this.api.postData('http://127.0.0.1:2018/api/categories', {
          category: this.newCategory
        });

        if (data['success']) {
          this.data.success(data['message']);
        } else {
          this.data.error(data['message']);
        }

      } catch (err) {
        this.data.error(err['message']);
      }

      this.btnDisabled = false;
  }

  onDelete (d) {

const url = `http://localhost:2018/api/categories/${d._id}`;
    this.api.deleteData(url).subscribe(res => {
   this.categories.splice(this.categories.indexOf(d), 1);
    });
  }

}
