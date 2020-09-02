import { alertDirective } from './alert-dynamic-componet/alertDirective.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AlertComponent,
        alertDirective,
        LoadingSpinnerComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        AlertComponent,
        alertDirective,
        LoadingSpinnerComponent
    ]
})
export class SharedModule {

}