import { Ingredient } from './../shared/ingredients.model';
import { ShoppingService } from './../shopping-list/shopping.services';
import { Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
@Injectable()

export class RecipeService implements OnInit {
    recipeChanged = new Subject<Recipe[]>()
    //array which set with data in back-end
    private recipes: Recipe[] = []



    //transfer copy of array
    getRecipes() {
        return this.recipes.slice();
    }
    //get detail of recipes by id(params)
    getRecipeDetail(index: number) {
        return this.recipes[index]
    }

    //add recipes to shopping-list
    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppingService.addIngredients(ingredients);
    }

    addRecipes(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())

    }
    updateRecipes(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice())

    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice())
    }
    //replace fetching recipes from server to existing array
    replaceRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice())
    }
    constructor(private shoppingService: ShoppingService) {
    }
    ngOnInit() {

    }

}

