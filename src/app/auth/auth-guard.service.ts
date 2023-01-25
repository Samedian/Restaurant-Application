import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs/observable";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
   
    constructor(private authService:AuthService, private route:Router){}


    canActivate(route: ActivatedRouteSnapshot,
        state:RouterStateSnapshot) : Observable<boolean| UrlTree> | Promise<boolean| UrlTree> | boolean | UrlTree {


           return this.authService.user.pipe(
            take(1),
            map(
                user =>{
                    const isAuth = !!user;
                    if(isAuth){
                        console.log(isAuth  + "Normal");
                        return true;
                    }
                    else{
                        console.log(isAuth  + "URL");
                        return this.route.createUrlTree(['/auth'])
                    }
                }
            )
           )
                return false;
        }
}
