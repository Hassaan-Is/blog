import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'signup-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  formData = {
    nom: '',
    prenom: '',
    mail :'',
    telephone: '',
    password: '',
    password2:'',
  };

  accountCreated = false;
  mdpError = false;

  constructor(private http: HttpClient,private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    if(this.sessionService.sessionExists()){
      this.router.navigate(['/accueil']);
    }
  }
  createAccount() {
    if (this.formData.password !== this.formData.password2) {
      console.error('Les mots de passe ne correspondent pas');
      this.mdpError = true;
      // Afficher un message d'erreur ou effectuer une action appropriée
      return;
    }
    else{
    this.http.post<any>('http://localhost:3000/create', this.formData)
      .subscribe(response => {
        // Gérer la réponse du serveur ici, par exemple, afficher un message de succès
        console.log('Compte créé avec succès :', response);
        this.accountCreated = true;
        setTimeout(() => {
          this.router.navigate(['/login']); // Rediriger vers la page "login" après un délai de 2 secondes
        }, 2000); 
      }, error => {
        // Gérer les erreurs ici, par exemple, afficher un message d'erreur
        console.error('Erreur lors de la création du compte :', error);
      });
  }}
}
