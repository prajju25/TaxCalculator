import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private route: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if((location.pathname == "/taxcalculator" || location.pathname == "/taxreport") && sessionStorage.getItem('taxReport')){
      return true;
    } else if ((location.pathname == "/user" || location.pathname == "/taxcalculator") && sessionStorage.getItem('userInfo')){
      return true;
    } else {
      this.route.navigate(['/user']);
    }
  }
  
}
