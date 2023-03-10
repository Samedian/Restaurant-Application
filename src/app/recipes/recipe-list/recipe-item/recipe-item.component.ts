import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipes : Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  // constructor(private rService:RecipeService) { }

  @Input() index:number;

  ngOnInit(): void {
  }

  // onSelected(){
  //   // this.recipeSelected.emit();
  //   this.rService.recipeSelected.emit(this.recipes);
  // }
}
