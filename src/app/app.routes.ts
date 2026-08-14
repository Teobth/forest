// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './ts/home';
import { ProjetComponent } from './ts/projet';
import { gestionComponent } from './ts/foretGestion';
import { EvenementsComponent } from './ts/evenement';
import { rejoindreComponent } from './ts/rejoindre';
import { BlogComponent } from './ts/blog';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'foret-gestion', component: gestionComponent },
  { path: 'evenement', component: EvenementsComponent },
  { path: 'rejoindre', component: rejoindreComponent },
  { path: 'blog', component: BlogComponent },
  { path: '**', redirectTo: '' }
];