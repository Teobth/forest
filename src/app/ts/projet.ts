import { Component } from '@angular/core';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [],
  templateUrl: '../html/projet.html',
  styleUrl: '../css/projet.css'
})
export class ProjetComponent {
  protected titrePage = "Le Projet : Échappée Sylvestre";
}