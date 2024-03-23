import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import {AccueilComponent} from "./accueil/accueil.component";

export const routes: Routes = [
    { path: 'accueil', title: 'accueil', component: AccueilComponent },
    { path: 'login', title: 'login', component: LoginComponent },
    { path: 'signup', title: 'signup', component: SignupComponent },
    { path: 'user/:nom', title: 'user', component: UserComponent },
];
