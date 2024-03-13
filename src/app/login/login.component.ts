import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    nom: '',
    password: '',
  };

  accountLogged = false;
  mdpError = false;

  constructor(private http: HttpClient, private router: Router) {}

  logAccount() {
    this.http.post<any>('http://localhost:3000/log', this.formData)
      .subscribe(response => {
        console.log('Réponse du serveur :', response);
        this.accountLogged = true;
        this.mdpError = false;
        this.router.navigate(['/singup']); // Rediriger vers la page "signup" après la connexion réussie
      }, error => {
        console.error('Erreur lors de la connexion :', error);
        if (error.status === 401) {
          // Utilisateur non trouvé, définir mdpError sur true
          this.mdpError = true;
        }
      });
  }
}
