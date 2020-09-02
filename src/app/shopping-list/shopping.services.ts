import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredients.model';

export class ShoppingService {
    ingredients: Ingredient[] = [
        new Ingredient('apples', 14),
        new Ingredient('Tomato', 10),
    ]

    //for adding ingredient in a copy of array
    ingredientChanged = new Subject<Ingredient[]>()
    //editing ingredients
    ingredientEdited = new Subject<Number>();

    //a copy of array transfered.next(this.ingredients.slice())
    getIngredients() {
        return this.ingredients.slice();
    }
    //return ingredients while editing
    getEditedIngredients(index: number) {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        //add ingredient in a copy of array(by default it's pushed in original array)
        this.ingredientChanged.next(this.ingredients.slice())
    }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice())
    }
    //update ingredients
    updateIngredients(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice())
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1)
        this.ingredientChanged.next(this.ingredients.slice())

    }


}