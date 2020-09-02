import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { HeaderComponent } from './header/header.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [

    BrowserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
