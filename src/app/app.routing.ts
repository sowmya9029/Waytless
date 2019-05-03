import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './_guards';


const routes: Routes = [
    //{ path: 'create', component: CreateComponent },
    //{ path: 'edit/:id', component: EditComponent },
    { path: 'register', component: RegistrationComponent },
   // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
   { path: '', redirectTo: '/home', pathMatch: 'full'},
  ];
export const routing =  RouterModule.forRoot(routes);