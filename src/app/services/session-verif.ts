import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class SessionVerif implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) {}

    canActivate(): boolean {
        if (this.sessionService.sessionExists()) {
            const idUser = this.sessionService.getId();
            if (idUser) {
                this.router.navigate(['/user', idUser]);
                return false;
            } else {
                this.router.navigate(['/accueil']);
                return false;
            }
        } else {
            return true;
        }
    }
}
