import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{

  ingredients : Ingredient[];
  private igChangeSub:Subscription
  constructor(private sServ:ShoppingListService) { }
  

  ngOnInit(): void {
    this.ingredients=this.sServ.getIngredient();
    this.igChangeSub = this.sServ.ingredientChange.subscribe(
      (ing:Ingredient[])=>{
        this.ingredients=ing;
      }
    )
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  onIngredientAdded(ing:Ingredient){
    this.ingredients.push(ing);
  }

}
