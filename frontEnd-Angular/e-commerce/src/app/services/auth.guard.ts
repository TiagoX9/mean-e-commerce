import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor (private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('token')) {
        return state.url.startsWith('/profile') ? true : (this.router.navigate(['/']), false);
      } else {
        return state.url.startsWith('/profile') ? (this.router.navigate(['/']), false) : true;
      }
  }
}
