import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private sServ:ShoppingListService) { }

  ngOnInit(): void {
  }

  AddIngredient(){
    const ingredient = new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value);
    // this.ingredientAdded.emit(ingredient);
    this.sServ.addIngredient(ingredient);
  }
}
