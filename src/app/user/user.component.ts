import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  nom: string = '';
  prenom: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Params reçus:', params);
      const nomUtilisateur = params['nom'];
      console.log('Nom utilisateur:', nomUtilisateur);

      // Astuce 1: Assurez-vous que le paramètre 'nom' est récupéré correctement
      if (!nomUtilisateur) {
        console.error('Le paramètre "nom" est manquant.');
        return;
      }

      // Astuce 2: Utilisez l'URL complète avec le protocole pour la requête HTTP
      const url = 'http://localhost:3000/user/' + nomUtilisateur;

      // Effectuer une requête GET vers votre API Express
      this.http.get<any>(url)
        .subscribe(data => {
          console.log('Données utilisateur reçues:', data);
          this.nom = data.nom;
          this.prenom = data.prenom;
        }, error => {
          // Astuce 3: Gérez les erreurs de manière appropriée
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        });
    });
  }
}
