import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm :NgForm;
  sub : Subscription; 
  editedMode =false;
  editedIndex;
  // @ViewChild('nameInput') name: ElementRef;
  // @ViewChild('amountInput') amount: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  editedItem:Ingredient;
  constructor(private sServ:ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.sServ.startedEditing.subscribe(
      (index: number) => {
        this.editedMode = true;
        this.editedIndex = index;
        this.editedItem= this.sServ.getSingleIngredient(this.editedIndex);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  AddIngredient(f:NgForm){
    const value=f.value; 
    const ingredient = new Ingredient(value.name,value.amount);

    // const ingredient = new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value);
    // this.ingredientAdded.emit(ingredient);
    if(this.editedMode)
      this.sServ.updateIngredient(this.editedIndex,ingredient);
      else
    this.sServ.addIngredient(ingredient);
    this.editedMode=false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editedMode=false;
  }

  onDelete(){
    this.sServ.deleteIngredient(this.editedIndex);
    this.onClear();
  }
}
