import { SharedModule } from './../shared/shared.module';
import { RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { authGuardService } from '../auth/auth-guard.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: "", component: ShoppingListComponent, canActivate: [authGuardService] }]),


    ],
    exports: [

    ]

})
export class ShoppingModule {

}