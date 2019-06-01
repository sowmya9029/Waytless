import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CustomMaterialModule } from './core/material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/registration/registration.component';
import { routing }        from './app.routing';
import { MenuComponent } from './components/menu/menu.component';
import { WaitlistEntryComponent } from './components/waitlist-entry/waitlist-entry.component';
import {OrderCartComponent} from './components/order-cart/order-cart.component'
import { manageWaitlistComponent } from './components/manageWaitlist/manageWaitlist.component';
import { ConfirmReservationComponent } from './components/confirm-reservation/confirm-reservation.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    MenuComponent,
    WaitlistEntryComponent,
    OrderCartComponent,
    manageWaitlistComponent,
    ConfirmReservationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
