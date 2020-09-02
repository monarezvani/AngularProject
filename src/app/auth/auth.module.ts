import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }

        ])
    ],

})
export class AuthModule { }