import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() {}

  setNom(nom: string) {
    sessionStorage.setItem('nom', nom); // Stocker la valeur dans sessionStorage
  }

  getNom(): string | null {
    return sessionStorage.getItem('nom'); // Récupérer la valeur depuis sessionStorage
  }

  clearNom() {
    sessionStorage.removeItem('nom'); // Supprimer la valeur depuis sessionStorage
  }
}
