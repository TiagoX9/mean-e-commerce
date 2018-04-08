import { DataService } from './../services/data.service';
import { JApiService } from './../services/j-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query: string;
  page = 1;
  content: any;

  constructor(private route: ActivatedRoute, private api: JApiService, private data: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.query = res['query'],
      this.page = 1,
      this.getProducts()
    })
  }

  get lower () {
    return 1 + this.content.hitsPerPage * this.content.page
  }

  get upper () {
    return Math.min(
      this.content.hitsPerPage * (this.content.page + 1),
      this.content.nbHits
    );
  }

  async getProducts () {
    this.content = null;

    try {
      const data = await this.api.getData(
        `http://localhost:2018/api/search?query=${this.query}&page=${this.page - 1}`
      );

      data['success'] ? (this.content = data['content']) : this.data.error(data['message']);

    }  catch (err) {
        this.data.error(err['message']);
      }
  }

}
