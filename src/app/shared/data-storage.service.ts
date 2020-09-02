import { AuthService } from '../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.services';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService implements OnInit {

    storeRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-recipes-24478.firebaseio.com/recipes.json', recipes).subscribe((response) => {
            console.log(response)
        })
    }
    fetchRecipes() {

        return this.http.
            get<Recipe[]>('https://ng-recipes-24478.firebaseio.com/recipes.json')
            .pipe(
                map(
                    recipes => {
                        return recipes.map(recipe => {
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        });
                    }),
                tap((recipes) => {
                    this.recipeService.replaceRecipes(recipes)
                }))

    }
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
    }
    ngOnInit() {

    }
} 