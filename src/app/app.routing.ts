import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { RegistrationComponent } from './components/registration/registration.component';

import { WaitlistEntryComponent } from './components/waitlist-entry/waitlist-entry.component';

import {OrderCartComponent} from './components/order-cart/order-cart.component';
import { AuthGuard } from './_guards';


const routes: Routes = [
    //{ path: 'create', component: CreateComponent },
    //{ path: 'edit/:id', component: EditComponent },
    { path: 'register', component: RegistrationComponent },
   // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'waitlist-entry', component: WaitlistEntryComponent},
    {path: 'order-cart', component: OrderCartComponent},
   { path: '', redirectTo: '/home', pathMatch: 'full'},
  ];
export const routing =  RouterModule.forRoot(routes);