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
        const nomUtilisateur = this.sessionService.getNom();
        this.router.navigate(['/user', nomUtilisateur]); // Rediriger vers /user/nomutilisateur si une session existe
        return false; // Bloquer l'accès à la route actuelle
        }
        return true; // Autoriser l'accès à la route actuelle si aucune session n'existe
    }
}
