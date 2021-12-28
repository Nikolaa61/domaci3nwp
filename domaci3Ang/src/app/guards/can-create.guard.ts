import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class CanCreateGuard implements CanActivate, CanDeactivate<unknown> {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const helper = new JwtHelperService();
    if (localStorage.getItem("jwt") != null){
      // @ts-ignore
      const roles = helper.decodeToken(localStorage.getItem("jwt"));
      if(roles.permisije.indexOf('can_create_users') > -1){
        return true;
      }
    }
    alert("Nemate dozvolu da pravite korisnike")

    return false;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
