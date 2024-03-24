import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: string = '';
  nom: string = '';
  prenom: string = '';

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
        // Si l'ID utilisateur est présent dans les paramètres de l'URL, utilisez-le
        this.fetchUserData(userId);
      } else {
        // Si aucun ID utilisateur n'est présent dans les paramètres de l'URL,
        const currentUserId = this.sessionService.getId();
        if (currentUserId) {
          // Utilisez l'ID utilisateur du service de session
          this.fetchUserData(currentUserId);
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
        console.log(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    );
  }

}
