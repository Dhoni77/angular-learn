import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private router: Router) {}
    // Check access to protected routes and prevent unauthorized user from accessing this. route
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    // Check access to protected child routes
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const url = state.url;
        return this.checkLogin(url);
    }

    // In angular, we implement lazy loading to download only required modules using loadchildren.
    // If we want to prevent unauthorized user we can use CanActivate guard but that would download the module which we don't want to happen.
    // To prevent navigation and to avoid downloading the module we need to use CanLoad.
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        return true;
    }
}