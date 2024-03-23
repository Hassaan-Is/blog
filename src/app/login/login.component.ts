import { Component,OnInit } from '@angular/core';
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

export class LoginComponent implements OnInit {
  formData = {
    nom: '',
    password: '',
  };

  accountLogged = false;
  mdpError = false;

  constructor(private http: HttpClient, private sessionService: SessionService, private router: Router) {}
  
  ngOnInit(): void {
    if(this.sessionService.sessionExists()){
      this.router.navigate(['/accueil']);
    }
  }

  logAccount() {
    this.http.post<any>('http://localhost:3000/log', this.formData)
      .subscribe(response => {
        this.sessionService.setNom(this.formData.nom); // Enregistrer le nom dans la session
        this.accountLogged = true;
        this.mdpError = false;
        if(this.sessionService.sessionExists()) {
          this.router.navigate(['/user/' + this.formData.nom]);
        };
      }, error => {
        console.error('Erreur lors de la connexion :', error);
        if (error.status === 401) {
          this.mdpError = true;
        }
      });
  }
}
