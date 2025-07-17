import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { userReducer } from './app/store/reducers';
import { UserEffects } from './app/store/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const bootstrap = () => bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./app/usuarios/usuarios').then(m => m.UsuariosComponent)
      }
    ]),
    provideStore({ usuarios: userReducer }),
    provideEffects([UserEffects]),
    importProvidersFrom(ReactiveFormsModule, CommonModule)
  ]
});

export default bootstrap;
