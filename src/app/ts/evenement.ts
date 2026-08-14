import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EvenementService, Evenement } from '../services/evenement.service';

@Component({
  selector: 'app-evenements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../html/evenement.html',
  styleUrl: '../css/evenement.css'
})
export class EvenementsComponent implements OnInit {
  ongletActif: 'futur' | 'passe' = 'futur';
  evenements: Evenement[] = [];
  
  modeAdmin = false;
  evenementEnCours: Partial<Evenement> = {};
  enModeEdition = false;

  constructor(private eventService: EvenementService) {}

  ngOnInit() {
    this.refresh();
  }

  // Méthode pour recharger la liste proprement
  refresh() {
    this.eventService.getEvenements().subscribe(data => {
      this.evenements = data;
    });
  }

  get evenementsFiltres(): Evenement[] {
    const aujourdhui = "2026-08-14";
    return this.evenements.filter(ev => {
      if (this.ongletActif === 'futur') return ev.date >= aujourdhui;
      else return ev.date < aujourdhui;
    });
  }

  ouvrirFormulaireAjout() {
    this.evenementEnCours = { date: new Date().toISOString().split('T')[0] };
    this.enModeEdition = false;
    this.modeAdmin = true;
  }

  ouvrirFormulaireEdition(ev: Evenement) {
    this.evenementEnCours = { ...ev };
    this.enModeEdition = true;
    this.modeAdmin = true;
  }

  sauvegarderEvenement() {
    if (this.enModeEdition && this.evenementEnCours.id) {
      this.eventService.modifier(this.evenementEnCours as Evenement);
    } else {
      this.eventService.ajouter(this.evenementEnCours as Omit<Evenement, 'id'>);
    }
    this.modeAdmin = false;
    this.refresh(); // Important : on rafraîchit la vue ici
  }

  supprimer(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
      this.eventService.supprimer(id);
      this.refresh(); // Important : on rafraîchit la vue ici
    }
  }
}