import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { RegistrationComponent } from './components/registration/registration.component';

import { WaitlistEntryComponent } from './components/waitlist-entry/waitlist-entry.component';

import { AuthGuard } from './_guards';
import { MenuComponent } from './components/menu/menu.component';

import {OrderCartComponent} from './components/order-cart/order-cart.component';

import { manageWaitlistComponent } from './components/manageWaitlist/manageWaitlist.component';

import {ConfirmReservationComponent} from './components/confirm-reservation/confirm-reservation.component';

const routes: Routes = [
  //{ path: 'create', component: CreateComponent },
  //{ path: 'edit/:id', component: EditComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'menu/:id', component: MenuComponent },
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'waitlist-entry/:id', component: WaitlistEntryComponent},
     { path: 'order-cart/:id',component: OrderCartComponent}, 
   { path: '', redirectTo: '/home', pathMatch: 'full'},
   { path: 'managewaitlist/:id', component: manageWaitlistComponent },
   { path: 'managewaitlist', component: manageWaitlistComponent },
   { path: 'confirmRes/:restId/:queueId', component: ConfirmReservationComponent }
  ];
export const routing =  RouterModule.forRoot(routes, {useHash:true});