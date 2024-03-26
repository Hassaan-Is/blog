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
templateUrl: './message.component.html',
styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit{
formData = {
  titre: '',
  text :'',
  idCompte:this.sessionService.getId(),
  visibiliter:''
};

messageCreated = false;

constructor(private http: HttpClient,private sessionService: SessionService, private router: Router) {}

ngOnInit(): void {
  if(!this.sessionService.sessionExists()){
    this.router.navigate(['/accueil']);
  }
}
createMessage() {
  this.http.post<any>('http://localhost:3000/addMessage', this.formData)
    .subscribe(response => {
      console.log('Compte créé avec succès :', response);
      this.messageCreated = true;
      setTimeout(() => {
        this.router.navigate(['/user']); // Rediriger vers la page "user"
      }, 1000); 
    }, error => {
      console.error('Erreur lors de la création du compte :', error);
    });
}

changeVisibility(visibiliter: string) {
  this.formData.visibiliter = visibiliter;
}

}