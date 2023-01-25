import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { R3SelectorScopeMode } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment} from '../../environments/environment'

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expireIn: string,
    localId: string,
    registered?: boolean
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    user = new BehaviorSubject<User>(null);
    token
    tokenExpirationDate:any;
    signUp(_email: string, _password: string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAuthKey ,
            {
                email: _email,
                password: _password,
                returnSecurityToken: true
            }).pipe(catchError(this.handleError),
                tap(res => {
                    this.handleAuth(res.email, res.localId, res.idToken, res.expireIn);
                })
            )
    }

    login(_email: string, _password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAuthKey,
            {
                email: _email,
                password: _password,
                returnSecurityToken: true
            }).pipe(catchError(this.handleError),
                tap(res => {
                    console.log(res.expireIn);
                    this.handleAuth(res.email, res.localId, res.idToken, '3600');
                })
            )
    }

    private handleAuth(email: string, userId: string, idToken: string, expireIn: string) {
        const expirationDate = new Date(new Date().getTime() + (+expireIn) * 1000);
        const _user = new User(email, userId, idToken, expirationDate);
        console.log(_user);
        this.user.next(_user);
        this.autoLogout(+expireIn*1000)
        localStorage.setItem('user',JSON.stringify(_user));
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknow error occured! '

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email Exist';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This Email not found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This Password is incorrect';
                break;
        }
        return throwError(errorMessage);

    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.tokenExpirationDate){
            clearTimeout(this.tokenExpirationDate);
        }
        this.tokenExpirationDate=null;

    }

    autoLogin(){
       const user :{
        email:string,
        id: string,
        _token: string,
        _tokenExpirationDate : string
       } = JSON.parse(localStorage.getItem('user'));
       if(!user){
        return
       }
        const loadedUser = new User(user.email, user.id, user._token,
            new Date(user._tokenExpirationDate));
                // remaining 
        const expiration = new Date(user._tokenExpirationDate).getTime()  - new Date().getTime();  
        if(loadedUser.token){
            this.user.next(loadedUser);
            this.autoLogout(expiration);
        }    

    }

    autoLogout(duration : number){

        this.tokenExpirationDate = setTimeout(()=>{
            this.logout();
        },duration);
    }
}