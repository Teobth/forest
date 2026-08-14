import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Article {
  id: number;
  titre: string;
  date: string;
  contenu: string;
  typeMedia: 'image' | 'video' | 'aucun';
  urlMedia?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private storageKey = 'swaldala_articles';

  constructor() {}

  getArticles(): Observable<Article[]> {
    const localData = localStorage.getItem(this.storageKey);
    if (localData) {
      return of(JSON.parse(localData));
    }

    // Articles par défaut si le localStorage est vide
    const defaultArticles: Article[] = [
      {
        id: 1,
        titre: "Premières lueurs sous la canopée",
        date: "2026-06-10",
        contenu: "Une matinée magique passée à observer les rayons du soleil percer la brume matinale entre les hêtres.",
        typeMedia: 'image',
        urlMedia: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
      }
    ];
    
    this.saveToLocalStorage(defaultArticles);
    return of(defaultArticles);
  }

  private saveToLocalStorage(articles: Article[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(articles));
  }

  ajouter(article: Omit<Article, 'id'>) {
    this.getArticles().subscribe(list => {
      const newId = list.length > 0 ? Math.max(...list.map(a => a.id)) + 1 : 1;
      const nouvelleListe = [{ ...article, id: newId }, ...list];
      this.saveToLocalStorage(nouvelleListe);
    });
  }

  supprimer(id: number) {
    this.getArticles().subscribe(list => {
      const nouvelleListe = list.filter(a => a.id !== id);
      this.saveToLocalStorage(nouvelleListe);
    });
  }

  modifier(articleModifie: Article) {
    this.getArticles().subscribe(list => {
      const nouvelleListe = list.map(a => a.id === articleModifie.id ? articleModifie : a);
      this.saveToLocalStorage(nouvelleListe);
    });
  }
}