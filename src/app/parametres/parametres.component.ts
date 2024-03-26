import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parametres',
  imports:[FormsModule,CommonModule],
  standalone:true,
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {

  formData = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  };

  accountUpdated = false;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.sessionService.sessionExists()) {
      this.router.navigate(['/accueil']);
    }

    this.route.params.subscribe(params => {
      const userId = params['id'];
      console.log('ID utilisateur:', userId);
      this.fetchUserData(userId);
    });
  }

  updateAccount(): void {
    console.log('Données du formulaire à envoyer:', this.formData);
    this.http.post<any>(`http://localhost:3000/update/${this.formData.id}`, this.formData)
      .subscribe(response => {
        this.accountUpdated = true;
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 2000);
      }, error => {
        console.error('Erreur lors de la mise à jour des éléments :', error);
      });
  }

  fetchUserData(userId: string): void {
    const url = `http://localhost:3000/user/${userId}`;
    console.log('URL de requête:', url);
  
    this.http.get<any>(url).subscribe(
      (data) => {
        this.formData.id = data.id;
        this.formData.nom = data.nom;
        this.formData.prenom = data.prenom;
        this.formData.email = data.email;
        this.formData.telephone = data.telephone ? data.telephone : '';
      },
      (error) => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    );
  }
  
}
