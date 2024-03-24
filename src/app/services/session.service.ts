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
  }

  setID(id: string) {
    sessionStorage.setItem('id', id); // Stocker l'ID dans le sessionStorage
  }
  
  getNom(): string | null {
    if (this.sessionExists()) {
      return sessionStorage.getItem('nom'); // Récupérer la valeur depuis sessionStorage si la session existe
    }
    return null;
  }

  getId(): string | null {
    if (this.sessionExists()) {
      return sessionStorage.getItem('id'); // Récupérer l'ID depuis sessionStorage si la session existe
    }
    return null;
  }

  clearNom() {
    sessionStorage.removeItem('nom');
    this.sessionExistsSubject.next(false); // Mettre à jour l'état de la session
  }

  sessionExists(): boolean {
    return sessionStorage.getItem('nom') !== null;
  }

  getSessionExistsObservable(): Observable<boolean> {
    return this.sessionExistsSubject.asObservable();
  }
}
