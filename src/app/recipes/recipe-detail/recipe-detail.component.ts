import { RecipeService } from './../recipe.services';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  //recieve selctedrecipe from recipes to show its detail
  SelectRecipe: Recipe;
  id: number;
  onAddToShoppingList() {
    this.recipeService.addToShoppingList(this.SelectRecipe.ingredients)
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.SelectRecipe = this.recipeService.getRecipeDetail(this.id);
      }
    )

  }

}
