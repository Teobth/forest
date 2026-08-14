import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Evenement {
  id: number;
  titre: string;
  date: string;
  description: string;
  lieu: string;
}

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private storageKey = 'swaldala_evenements';

  constructor() {}

  // Récupérer les événements depuis le localStorage (ou initialiser avec des données par défaut)
  getEvenements(): Observable<Evenement[]> {
    const localData = localStorage.getItem(this.storageKey);
    if (localData) {
      return of(JSON.parse(localData));
    }

    // Événements par défaut si le localStorage est vide
    const defaultEvenements: Evenement[] = [
      {
        id: 1,
        titre: "Sortie Découverte des Champignons",
        date: "2026-10-15",
        description: "Apprenez à reconnaître les espèces comestibles et toxiques en automne.",
        lieu: "Forêt de la Hardt"
      },
      {
        id: 2,
        titre: "Observation du Brame du Cerf",
        date: "2026-09-25",
        description: "Une veillée silencieuse au crépuscule pour écouter et observer le grand cervidé.",
        lieu: "Réserve naturelle"
      },
      {
        id: 3,
        titre: "Atelier Photographie sous Canopée",
        date: "2025-05-12",
        description: "Maîtrisez les jeux de lumière et de brume dans les sous-bois.",
        lieu: "Vallée de Munster"
      }
    ];

    this.saveToLocalStorage(defaultEvenements);
    return of(defaultEvenements);
  }

  // Sauvegarder dans le localStorage
  private saveToLocalStorage(evenements: Evenement[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(evenements));
  }

  // Ajouter un événement
  ajouter(evenement: Omit<Evenement, 'id'>) {
    this.getEvenements().subscribe(list => {
      const newId = list.length > 0 ? Math.max(...list.map(e => e.id)) + 1 : 1;
      const nouvelleListe = [...list, { ...evenement, id: newId }];
      this.saveToLocalStorage(nouvelleListe);
    });
  }

  // Supprimer un événement
  supprimer(id: number) {
    this.getEvenements().subscribe(list => {
      const nouvelleListe = list.filter(e => e.id !== id);
      this.saveToLocalStorage(nouvelleListe);
    });
  }

  // Modifier un événement
  modifier(evenementModifie: Evenement) {
    this.getEvenements().subscribe(list => {
      const nouvelleListe = list.map(e => e.id === evenementModifie.id ? evenementModifie : e);
      this.saveToLocalStorage(nouvelleListe);
    });
  }
}