import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios';

export const routes: Routes = [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UsuariosComponent }
];
