import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';

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
  nom: string | null;


  constructor(private http: HttpClient, private sessionService: SessionService, private router: Router) {
    this.nom = this.sessionService.getNom();
  }

  logAccount() {
    this.sessionService.setNom(this.formData.nom);

    this.http.post<any>('http://localhost:3000/log', this.formData)
      .subscribe(response => {
        console.log('Réponse du serveur :', response);
        this.accountLogged = true;
        this.mdpError = false;
        this.router.navigate(['/user/' + this.formData.nom]);
      }, error => {
        console.error('Erreur lors de la connexion :', error);
        if (error.status === 401) {
          this.mdpError = true;
        }
      });
  }
}
