import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/Usuario';

export const loadUsers = createAction('[Usuarios] usuarios cargados');
export const loadUsersSuccess = createAction('[Usuarios] usuarios cargados con exito', props<{ usuarios: Usuario[] }>());
export const loadUsersFailure = createAction('[Usuarios] error en carga de usuarios', props<{ error: string }>());

export const addUser = createAction('[Usuarios] usuario agregado', props<{ usuario: Usuario }>());
export const updateUser = createAction('[Usuarios] usuario actualizado', props<{ usuario: Usuario }>());
export const deleteUser = createAction('[Usuarios] usuario eliminado', props<{ id: number }>());
export const setFiltroRol = createAction('[Usuarios] filtro rol', props<{ rol: string | null }>());
export const setFiltroBusqueda = createAction('[Usuarios] filtro busqueda', props<{ busqueda: string }>());
