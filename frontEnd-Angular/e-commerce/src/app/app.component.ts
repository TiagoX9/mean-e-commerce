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

  constructor (public data: DataService, private router: Router) {
    // will be moved to ngOnInit
    this.data.getProfile();
   }

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
