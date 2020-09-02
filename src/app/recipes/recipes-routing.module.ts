import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { authGuardService } from '../auth/auth-guard.service';
import { RecipesStartComponent } from './recipes-start/recipes-start';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolverService } from './recipes-resolver.service';
const routes: Routes = [
    {
        path: "", component: RecipesComponent, canActivate: [authGuardService],
        children: [
            {
                path: "", component: RecipesStartComponent,
                data: { message: "Please Select a Recipe Item " }
            },
            { path: 'new', component: RecipeEditComponent },
            { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolverService] },
            {
                path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService]
            },

        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {

}