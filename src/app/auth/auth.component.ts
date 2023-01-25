import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent {

    isLoginMode = true;
    isLoading = false;
    error =null;
    authObs : Observable<AuthResponseData>;
    @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;

    constructor(private auth: AuthService, private router : Router,
        private componentFactoryResolver : ComponentFactoryResolver) { }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        if (this.isLoginMode) {
            this.authObs = this.auth.login(email, password);
        } else {
            this.authObs = this.auth.signUp(email, password);
        }
        this.authObs.subscribe(
            response => {
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['/recipes'])

            }, errorMessage => {
                console.log(errorMessage);
                this.showErrorAlert(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;

            }

        );

        form.reset();

    }

    onHandleError(){
        this.error=null;
    }

    private Sub : Subscription;
    private showErrorAlert(message:string){
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        //create place
        const hostViewContainerRef = this.alertHost.viewConRef;
        //clear before data
        hostViewContainerRef.clear();

        const compRef = hostViewContainerRef.createComponent(alertComponentFactory);
        compRef.instance.message= message;
        this.Sub = compRef.instance.close.subscribe(
            res =>{
                this.Sub.unsubscribe();
                hostViewContainerRef.clear();
            }
        ) 
    }
}