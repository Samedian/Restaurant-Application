import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{

    constructor(private data: DataStorageService, private authService : AuthService){}
    isAuthenticated = false;

    subcription : Subscription;
    ngOnInit(): void {
        this.subcription = this.authService.user.subscribe(
            user =>{
                this.isAuthenticated = !!user 
            }
        );


    }
    ngOnDestroy(): void {
        this.subcription.unsubscribe();
    }
    @Output() featureSelected = new EventEmitter<string>();
    onSelect(feature:string){
        this.featureSelected.emit(feature);
    }
    save(){
        this.data.storeRecipes();
    }

    fetch(){
        this.data.fetchRecipes().subscribe();
    }

    onLogOut(){
        this.authService.logout();
    }
}