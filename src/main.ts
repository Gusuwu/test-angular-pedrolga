import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './app/store/reducers';
import { UserEffects } from './app/store/effects';


bootstrapApplication(App, {
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
