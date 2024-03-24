import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit{
  
  nom: string | null;
  id: string = '';
  constructor(private sessionService: SessionService) { 
    this.nom = this.sessionService.getNom(); // Obtenir la valeur du nom depuis le service dès la création du composant
  }

  ngOnInit(): void {
    this.nom = this.sessionService.getNom();
    this.formData.date = new Date().toString();
  }

  formData = {
    auteur: this.sessionService.getNom(),
    date: '',
    titre: '',
    contenu: '',
  };

  createMessage() {
    // Vérification que tous les champs sont remplis
    if (this.formData.titre && 
        this.formData.date && 
        this.formData.contenu) {
          console.log('Tous les champs sont remplis. Enregistrement du message...');
          console.log('Auteur :', this.nom);
          console.log('Titre :', this.formData.titre);
          console.log('Date :', this.formData.date);
          console.log('Contenu :', this.formData.contenu);
      
          // Réinitialisation des valeurs du formulaire après l'enregistrement
          this.formData.titre = '';
          this.formData.contenu = '';

      // Ajouter ici le code pour enregistrer le message dans la base de données
    } else {
      // Afficher un message d'erreur si tous les champs ne sont pas remplis
      console.error('Veuillez remplir tous les champs du formulaire.');
      // Vous pouvez également ajouter une logique pour afficher un message à l'utilisateur pour lui indiquer qu'il doit remplir tous les champs
    }
  }

}