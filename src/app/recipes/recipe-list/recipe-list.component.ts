import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from './../recipe.services';
import { Recipe } from './../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //store a copy of Array in RecipeService into Recipes
  recipes: Recipe[]
  //for unsubcribe custome observable
  changeSubscription: Subscription

  constructor(private RecipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.recipes = this.RecipeService.getRecipes();
    //for update changes in recipeEdit
    this.changeSubscription = this.RecipeService.recipeChanged.subscribe((newRecipes: Recipe[]) => {
      this.recipes = newRecipes
    })
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
  ngOnDestroy() {
    this.changeSubscription.unsubscribe()
  }
}
