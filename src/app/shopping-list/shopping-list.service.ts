import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    // ingredientChange= new EventEmitter<Ingredient[]>();
    ingredientChange= new Subject<Ingredient[]>();

    
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomata', 10)
    ];

    getIngredient() {
        return this.ingredients.slice();
    }
    addIngredient(ing: Ingredient) {
        this.ingredients.push(ing);
        //emit to next
        this.ingredientChange.next(this.ingredients.slice());
    }
    addIngredients(ing:Ingredient[]){
        this.ingredients.push(...ing);
        this.ingredientChange.next(this.ingredients.slice());
    }
}