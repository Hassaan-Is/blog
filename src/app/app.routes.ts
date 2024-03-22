import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: 'login', title: 'login', component: LoginComponent },
    { path: 'signup', title: 'signup', component: SignupComponent },
    { path: 'user/:nom', title: 'user', component: UserComponent },
];
