import { Component, OnInit, OnDestroy } from '@angular/core';

import { ShoppingService } from './shopping.services';

import { Ingredient } from './../shared/ingredients.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private igChangeSub: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  onEditItem(index: number) {
    this.shoppingService.ingredientEdited.next(index)
  }
  //recieve a copy of array 
  ngOnInit(): void {

    this.ingredients = this.shoppingService.getIngredients();
    //for apply any changes into a copy of array
    this.igChangeSub = this.shoppingService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => { this.ingredients = ingredients }
    );

  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
