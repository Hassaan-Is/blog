import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AccueilComponent } from './accueil/accueil.component';
import { SessionVerif } from './services/session-verif';
import { MessageComponent } from './message/message.component';

export const routes: Routes = [
    { path: 'login', title: 'login', component: LoginComponent },
    { path: 'signup', title: 'signup', component: SignupComponent },
    { path: 'accueil', title: 'accueil', component: AccueilComponent },
    { path: 'user/:nom', component: UserComponent },
    { path: 'user', component: UserComponent, canActivate: [SessionVerif] }, // Utilisation du garde 
    { path:'message', title: 'message', component: MessageComponent},
    { path: '**', redirectTo: '/accueil' }
];