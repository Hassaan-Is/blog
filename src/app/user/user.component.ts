import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  nom: string = '';
  prenom: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nomUtilisateur = params['nom'];
      
      if (!nomUtilisateur) {
        console.error('Le paramètre "nom" est manquant.');
        return;
      }

      this.fetchUserData(nomUtilisateur);
    });
  }

  fetchUserData(nomUtilisateur: string): void {
    const url = `http://localhost:3000/user/${nomUtilisateur}`;

    this.http.get<any>(url).subscribe(
      (data) => {
        console.log('Données utilisateur reçues:', data);
        this.nom = data.nom;
        this.prenom = data.prenom;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    );
  }
}