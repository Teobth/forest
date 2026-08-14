import { Component } from '@angular/core';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [],
  templateUrl: '../html/foretGestion.html',
  styleUrl: '../css/foretGestion.css'
})
export class gestionComponent {
  protected titrePage = "La Gestion de la Forêt : Échappée Sylvestre";
}