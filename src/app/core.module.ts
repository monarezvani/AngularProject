import { NgModule } from '@angular/core';
import { ShoppingService } from './shopping-list/shopping.services';
import { RecipeService } from './recipes/recipe.services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppingService,
        RecipeService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ]
})
export class CoreModule {

}
