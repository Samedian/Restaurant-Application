import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[];
  
  constructor(private sServ:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.sServ.getIngredient();
    this.sServ.ingredientChange.subscribe(
      (ing:Ingredient[])=>{
        this.ingredients=ing;
      }
    )
  }
  onIngredientAdded(ing:Ingredient){
    this.ingredients.push(ing);
  }

}
