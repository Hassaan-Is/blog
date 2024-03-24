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
                this.router.navigate(['/user', idUser]); // Rediriger vers la route user/idUser si une session existe
            } else {
                this.router.navigate(['/accueil']); // Rediriger vers la page d'accueil si l'ID de l'utilisateur n'est pas disponible
            }
            return false; // Bloquer l'accès à la route actuelle
        } else {
            return true; // Autoriser l'accès à la route actuelle si aucune session n'existe
        }
    }
}
