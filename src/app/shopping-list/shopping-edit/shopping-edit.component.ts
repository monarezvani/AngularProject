import { Subscription } from 'rxjs';
import { ShoppingService } from './../shopping.services';
import { Ingredient } from './../../shared/ingredients.model';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) form: NgForm
  //edit ingredient
  editMode = false;
  editedItemIndex: number
  editedItem: Ingredient;
  //unsubscribe Observable
  editingSubscribtion: Subscription

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.editingSubscribtion = this.shoppingService.ingredientEdited.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingService.getEditedIngredients(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
    )
  }
  onSubmit() {
    const value = this.form.value;
    let newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredients(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.form.reset();
  }
  onClear() {
    this.editMode = false;
    this.form.reset();
  }
  onDelete() {
    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.editingSubscribtion.unsubscribe()
  }

}
