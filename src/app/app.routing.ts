import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { RegistrationComponent } from './components/registration/registration.component';

import { WaitlistEntryComponent } from './components/waitlist-entry/waitlist-entry.component';

import { AuthGuard } from './_guards';
import { MenuComponent } from './components/menu/menu.component';

import {OrderCartComponent} from './components/order-cart/order-cart.component'


const routes: Routes = [
    //{ path: 'create', component: CreateComponent },
    //{ path: 'edit/:id', component: EditComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'menu/:id', component: MenuComponent },
   // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'waitlist-entry', component: WaitlistEntryComponent},
    // { path: 'order-cart',component: OrderCartComponent}, --- FIX ME
   { path: '', redirectTo: '/home', pathMatch: 'full'}
  ];
export const routing =  RouterModule.forRoot(routes);