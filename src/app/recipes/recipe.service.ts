import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
    constructor(private slSer :ShoppingListService){};

    recipeSelected = new Subject<Recipe>();
    recipeChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('Pizza', 'Italian', 'http://surl.li/ekhwa',
    //     [new Ingredient('Pizza Base',1),new Ingredient('Sauces',1),new Ingredient('Herbs',1)]),
    //     new Recipe('Dosa', 'South Indian', 'http://surl.li/ekhwa',[
    //         new Ingredient('batter',1),
    //         new Ingredient('Paste',1)
    //     ])

    // ];
    recipes : Recipe[]=[];
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
        this.recipeChanged.next(this.recipes.slice());

    }

    addIngredientToShoppingList(ing:Ingredient[]){
       this.slSer.addIngredients(ing);
    }


    updateRecipe(index:number, recipe:Recipe){
        this.recipes[index]= recipe
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());

    }

    setRecipe(_recipes:Recipe[]){
        this.recipes = _recipes
        this.recipeChanged.next(this.recipes.slice())
    }
}