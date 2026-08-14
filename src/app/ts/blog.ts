import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService, Article } from '../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [BlogService],
  templateUrl: '../html/blog.html',
  styleUrl: '../css/blog.css'
})
export class BlogComponent implements OnInit {
  articles: Article[] = [];
  modeAdmin = false;
  articleEnCours: Partial<Article> = { typeMedia: 'aucun' };
  enModeEdition = false;

  constructor(@Inject(BlogService) private blogService: BlogService) {}

  ngOnInit() {
    this.chargerArticles();
  }

  chargerArticles() {
    this.blogService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  ouvrirFormulaireAjout() {
    this.articleEnCours = { typeMedia: 'aucun', date: new Date().toISOString().split('T')[0] };
    this.enModeEdition = false;
    this.modeAdmin = true;
  }

  ouvrirFormulaireEdition(article: Article) {
    this.articleEnCours = { ...article };
    this.enModeEdition = true;
    this.modeAdmin = true;
  }

  sauvegarderArticle() {
    if (this.enModeEdition && this.articleEnCours.id) {
      this.blogService.modifier(this.articleEnCours as Article);
    } else {
      this.blogService.ajouter(this.articleEnCours as Omit<Article, 'id'>);
    }
    this.modeAdmin = false;
    this.chargerArticles();
  }

  supprimer(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
      this.blogService.supprimer(id);
      this.chargerArticles();
    }
  }
}