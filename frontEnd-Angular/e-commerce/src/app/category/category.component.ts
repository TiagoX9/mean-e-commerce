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

  constructor(private data: DataService, private api: JApiService) { }

 async ngOnInit() {
   console.log('triggered')
      try {
        const data = await this.api.getData('http://127.0.0.1:2018/api/categories');

        if (data['success']) {
          console.log('got categories');;
          this.categories = data['category'];
        } else { this.data.error(data['message']); }

      } catch (err) {
        this.data.error(err['message']);
      }
  }

}
