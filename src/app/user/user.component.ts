import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
selector: 'user-root',
standalone:true,
imports:[CommonModule],
templateUrl: './user.component.html',
styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

id: string = '';
nom: string = '';
prenom: string = '';
messages: any[] = [];

sessionUtilisateur: boolean = false;

constructor(
  private route: ActivatedRoute,
  private http: HttpClient,
  private sessionService: SessionService,
  private router: Router
) { }

droitConnecte: boolean = false;


ngOnInit(): void {
  if (!this.sessionService.sessionExists()) {
    this.router.navigate(['/accueil']);
    return; // Sortir de la fonction ngOnInit() si la session n'existe pas
  }

  this.route.params.subscribe(params => {
    const userId = params['id'];
    const currentUserId = this.sessionService.getId();
    
    // Vérifier si un ID utilisateur est fourni dans l'URL
    if (userId) {
      // Si un ID utilisateur est fourni, récupérez les données de cet utilisateur
      this.fetchUserData(userId);
      this.fetchUserMessages(userId);
      this.sessionUtilisateur = false; // Cet utilisateur n'est pas le propriétaire de la session actuelle

      // Masquer le bouton Suivre si l'ID de la session correspond à l'ID de l'utilisateur dans l'URL
      if (currentUserId && currentUserId === userId) {
        this.droitConnecte = false;
      } else {
        this.droitConnecte = true;
      }
    } else if (currentUserId) {
      // Si aucun ID utilisateur est fourni, mais l'utilisateur est connecté, affichez les données de son propre compte
      this.fetchUserData(currentUserId);
      this.fetchUserMessages(currentUserId);
      this.sessionUtilisateur = true; // Cet utilisateur est le propriétaire de la session actuelle
      this.droitConnecte = false; // Masquer le bouton Suivre car c'est le compte de l'utilisateur actuel
    } else {
      // Si aucun ID utilisateur est fourni et que l'utilisateur n'est pas connecté, redirigez-le vers la page d'accueil
      this.router.navigate(['/accueil']);
    }
  });
}


fetchUserData(userId: string): void {
const url = `http://localhost:3000/user/${userId}`;

this.http.get<any>(url).subscribe(
  (data) => {
    this.id = data.id;
    this.nom = data.nom;
    this.prenom = data.prenom;
  },
  (error) => {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }
);
}

  fetchUserMessages(userId: string): void {
    const url = `http://localhost:3000/messages/${userId}`;
  
    this.http.get<any[]>(url)
      .subscribe((data: any[]) => {
        // Réinitialiser le tableau des messages pour éviter les doublons
        this.messages = [];
        
        // Parcourir les données reçues et les ajouter au tableau des messages
        data.forEach(item => {
          this.messages.push({
            id: item.id,
            date: item.date,
            nom: item.nom,
            prenom: item.prenom,
            text: item.text,
            compte: { id: item.idCompte, nom: item.nom, prenom: item.prenom }
          });
        });
  
        console.log('Messages récupérés avec succès :', this.messages);
      },
      (error) => {
        console.error('Erreur lors de la récupération des messages utilisateur:', error);
      }
    );
  }
  
  
}
