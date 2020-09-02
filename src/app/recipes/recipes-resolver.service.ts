import { RecipeService } from './recipe.services';
import { DataStorageService } from './../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.db.fetchRecipes()

        } else {
            return recipes;
        }
    }
    constructor(private db: DataStorageService, private recipeService: RecipeService) {

    }
}