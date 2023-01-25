import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Injectable()
export class AuthIntereptorService implements HttpInterceptor{

    constructor(private authService: AuthService){}

    intercept(req : HttpRequest<any>,next : HttpHandler){
 
        
        return this.authService.user.pipe(take(1), exhaustMap(
            user => {
                if(!user)
                    return next.handle(req);
                const modified = req.clone({params: new HttpParams().set('auth',user.token)});

                return next.handle(modified);
            }))
    }

} 