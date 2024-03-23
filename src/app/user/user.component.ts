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

  nom: string = '';
  prenom: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.sessionService.sessionExists()) {
      this.router.navigate(['/accueil']); // Rediriger vers la page d'accueil si la session n'existe pas
    }
    this.route.params.subscribe(params => {
      const nomUtilisateur = params['nom'];
      this.fetchUserData(nomUtilisateur);
    });
  }

  fetchUserData(nomUtilisateur: string): void {
    const url = `http://localhost:3000/user/${nomUtilisateur}`;

    this.http.get<any>(url).subscribe(
      (data) => {
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
