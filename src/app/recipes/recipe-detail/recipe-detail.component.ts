import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  // @Input() recipe: Recipe;
  recipe: Recipe;
  id:number;
  sub: Subscription;
  constructor(private recSer: RecipeService, private route:ActivatedRoute,
    private router:Router) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub= this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id'];
        console.log(this.id);
        this.recipe= this.recSer.getSingleRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    
    this.recSer.addIngredientToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})

  }
  onDeleteRecipe(){
    this.recSer.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
