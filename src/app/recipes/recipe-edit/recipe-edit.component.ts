import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode = false;
  recipeForm :FormGroup;
  constructor(private route:ActivatedRoute, private recSer:RecipeService, private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
          this.id=params['id'];
          this.editMode= params['id'] !=null;
          this.initForm();
      }
    )
  }

  onSubmit(){
    // const NewRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients']);
     if(this.editMode){
      this.recSer.updateRecipe(this.id,this.recipeForm.value)
    }else{
      this.recSer.addRecipe(this.recipeForm.value)
    }
  }
  private initForm(){

    let recipeName='';
    let recipepath='';
    let recipeDesc='';
    let recipeIng = new FormArray([]);
    if(this.editMode){
      const rec =this.recSer.getSingleRecipe(this.id);
      recipeName=rec.name;
      recipepath=rec.imagePath;
      recipeDesc=rec.description;
      if(rec['ingredients']){
        for(let i of rec.ingredients){
          console.log(i.name + ' '+ i.amount);

          recipeIng.push(
            new FormGroup({
              'name': new FormControl(i.name, Validators.required),
              'amount': new FormControl(i.amount, [Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])

            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipepath, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIng
    })
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('',Validators.required),
        'amount': new FormControl('',[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )

  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
