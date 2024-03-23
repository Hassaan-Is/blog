import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'navbar-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  sessionExists: boolean = false;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getSessionExistsObservable().subscribe(sessionExists => {
      this.sessionExists = sessionExists;
    });
  }

  endSession(): void {
    this.sessionService.clearNom(); // Appeler la méthode clearNom() pour supprimer la session
    window.location.reload();
  }
}

