import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';


const appRoutes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: 'full' },
  {
    path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },
  { path: 'not-found', component: NotFoundComponent, data: { message: 'The page is not Found' } },
  { path: '**', redirectTo: "/not-found" }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
