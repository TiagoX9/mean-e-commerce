import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm = '';
  isCollapsed = true;

  constructor (private data: DataService, private router: Router) { }

  get token() {
    return localStorage.getItem('token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.data.user = { };
    localStorage.clear();
    this.router.navigate(['/']);

  }

  search() {}
}
