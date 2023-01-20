import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    constructor(private slSer :ShoppingListService){};

    recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Pizza', 'Italian', 'http://surl.li/ekhwa',
        [new Ingredient('Pizza Base',1),new Ingredient('Sauces',1),new Ingredient('Herbs',1)]),
        new Recipe('Dosa', 'South Indian', 'http://surl.li/ekhwa',[
            new Ingredient('batter',1),
            new Ingredient('Paste',1)
        ])

    ];
    getRecipe(){
        //return other array
        return this.recipes.slice();
    }

    getSingleRecipe(index:number){
        //return other array
        return this.recipes.slice()[index];
    }
    addRecipe(recipe:Recipe){

        this.recipes.push(recipe);
    }

    addIngredientToShoppingList(ing:Ingredient[]){
       this.slSer.addIngredients(ing);
    }
}