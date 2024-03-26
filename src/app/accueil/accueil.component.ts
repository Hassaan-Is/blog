import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{
  listMessage : Message[] = [];
  index: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMessage();
  }

  
  fetchMessage() {
    this.http.get<any[]>('http://localhost:3000/messages')
      .subscribe((data: any[]) => {
        data.forEach(item => {
          this.listMessage.push(new Message(item.id,item.titre, item.date, item.text, new Compte(item.idCompte, item.nom, item.prenom)));
        });
      });
  }
}

class Message{
  id:number;
  titre:string;
  date: string;
  text: string;
  compte:Compte;

  constructor(id: number,titre: string,date: string ,text: string, compte: Compte) {
    this.id = id;
    this.titre = titre;
    this.date = date;
    this.text = text;
    this.titre = titre;
    this.compte = compte;
  }
}

class Compte {
  id: number;
  nom: string;
  prenom: string;

  constructor(id: number, nom: string, prenom: string) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
  }
}
