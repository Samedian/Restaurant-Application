import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
   constructor(private http: HttpClient, private recServ : RecipeService){}

   storeRecipes(){
        const recipes =this.recServ.getRecipe();
        this.http.put('https://angular-6aa88-default-rtdb.firebaseio.com/recipes.json',recipes)
        .subscribe(
            response =>{
                console.log(response);
                
            }
        );
   }

   fetchRecipes(){
     return this.http.get<Recipe[]>('https://angular-6aa88-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
        map(recipes=>{
            return recipes.map(recipes =>{
                return {...recipes, ingredients : recipes.ingredients? recipes.ingredients:[] }
            })
        }),
        tap(
            events =>{
                this.recServ.setRecipe(events)
            }
        )
    );
   }
 }
 