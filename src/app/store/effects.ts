import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsuarioActions from './actions';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { Usuario } from '../models/Usuario';

@Injectable()
export class UserEffects {
  loadUsers$;

  constructor(private actions$: Actions) {
    this.loadUsers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UsuarioActions.loadUsers),
        switchMap(() =>
          of(mockUsuarios).pipe(
            delay(1000),
            map(data => UsuarioActions.loadUsersSuccess({ usuarios: data })),
            catchError(() =>
              of(UsuarioActions.loadUsersFailure({ error: 'Error al cargar usuarios' }))
            )
          )
        )
      )
    );
  }
}

let mockUsuarios: Usuario[] = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  nombre: 'Nombre ' + (i + 1),
  apellido: 'Apellido ' + (i + 1),
  email: `user${i + 1}@mail.com`,
  rol: i % 2 === 0 ? 'Admin' : 'User'
}));
