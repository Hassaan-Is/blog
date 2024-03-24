import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionExistsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.sessionExists());

  constructor() {}

  setNom(nom: string) {
    sessionStorage.setItem('nom', nom);
    this.sessionExistsSubject.next(true); // Mettre à jour l'état de la session
    console.log('Nom de session enregistré :', nom);
  }

  setID(id: string) {
    sessionStorage.setItem('id', id); // Stocker l'ID dans le sessionStorage
    console.log('ID de session enregistré :', id);
  }
  
  getNom(): string | null {
    const nom = sessionStorage.getItem('nom');
    console.log('Nom de session récupéré :', nom);
    return nom;
  }

  getId(): string | null {
    const id = sessionStorage.getItem('id');
    console.log('ID de session récupéré :', id);
    return id;
  }

  clearNom() {
    sessionStorage.removeItem('nom');
    this.sessionExistsSubject.next(false); // Mettre à jour l'état de la session
    console.log('Nom de session effacé');
  }

  sessionExists(): boolean {
    const exists = sessionStorage.getItem('nom') !== null;
    console.log('Session existe :', exists);
    return exists;
  }

  getSessionExistsObservable(): Observable<boolean> {
    return this.sessionExistsSubject.asObservable();
  }
}
