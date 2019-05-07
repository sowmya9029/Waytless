import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomMaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/registration/registration.component';
import { routing }        from './app.routing';
import { MenuComponent } from './components/menu/menu.component';
import { WaitlistEntryComponent } from './components/waitlist-entry/waitlist-entry.component';
import {OrderCartComponent} from './components/order-cart/order-cart.component'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    MenuComponent,
    WaitlistEntryComponent,
    OrderCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
