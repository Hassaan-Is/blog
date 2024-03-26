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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.fetchUserData(userId);
        this.fetchUserMessages(userId); // Récupérer les messages de l'utilisateur
        this.sessionUtilisateur = true; // Mettre à jour sessionUtilisateur lorsque l'ID utilisateur est présent
      } else {
        const currentUserId = this.sessionService.getId();
        if (currentUserId) {
          // Utilisez l'ID utilisateur du service de session
          this.fetchUserData(currentUserId);
          this.fetchUserMessages(currentUserId); // Récupérer les messages de l'utilisateur
          this.sessionUtilisateur = true; // Mettre à jour sessionUtilisateur lorsque l'ID utilisateur est présent
        } else {
          // Si aucun ID utilisateur n'est trouvé, redirigez vers la page d'accueil
          this.router.navigate(['/accueil']);
        }
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
