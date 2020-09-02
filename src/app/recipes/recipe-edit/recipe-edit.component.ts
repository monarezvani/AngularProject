import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from './../recipe.services';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  //define if its in editRecipe or new Recipe
  editMode = false;
  //define ReactiveForm
  recipeForm: FormGroup;



  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    //if the url has id it turns false(new Recipes) else true(edit mode)
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        //everytime id change and page reloaded,initiate the form
        this.initForm()

      }
    )
  }

  initForm() {
    //for initiate null form value by default(for newRecipe)

    let recipeName = '';
    let recipeDesc = '';
    let recipeImage = '';
    let recipeIngredients = new FormArray([]);
    //array
    if (this.editMode) {
      let recipe: Recipe = this.recipeService.getRecipeDetail(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImage = recipe.imagePath;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          (recipeIngredients as FormArray).push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[0-9]+[1-9]*$')])

          }))
        }
      }
    }
    //initial form
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'imagePath': new FormControl(recipeImage, Validators.required),
      'ingredients': recipeIngredients
    })

  }
  getControls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {

    // const recipe: Recipe = new Recipe( this.recipeForm.value['name'],this.recipeForm.value['description'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredients'])
    if (this.editMode) {
      this.recipeService.updateRecipes(this.id, this.recipeForm.value);

    } else {
      this.recipeService.addRecipes(this.recipeForm.value)
    }
    this.onCancel()
  }
  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(),
      'amount': new FormControl()
    }))
  }

  //navigate away when press cancel
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  //delete ingredient by close button

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
