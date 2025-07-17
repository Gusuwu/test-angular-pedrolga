import { createReducer, on } from '@ngrx/store';
import * as UsuarioActions from './actions';
import { Usuario } from '../models/Usuario';

export interface State {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
  filtros: {
    rol: string | null;
    busqueda: string;
  };
}

export const initialState: State = {
  usuarios: [],
  loading: false,
  error: null,
  filtros: {
    rol: null,       
    busqueda: '' 
  }
};

export const userReducer = createReducer(
  initialState,

  on(UsuarioActions.loadUsers, state => ({ ...state, loading: true })),
  on(UsuarioActions.loadUsersSuccess, (state, { usuarios }) => ({
    ...state,
    usuarios,
    loading: false,
    error: null
  })),
  on(UsuarioActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(UsuarioActions.addUser, (state, { usuario }) => ({
    ...state,
    usuarios: [...state.usuarios, usuario]
  })),

  on(UsuarioActions.updateUser, (state, { usuario }) => ({
    ...state,
    usuarios: state.usuarios.map(u => (u.id === usuario.id ? usuario : u))
  })),

  on(UsuarioActions.deleteUser, (state, { id }) => ({
    ...state,
    usuarios: state.usuarios.filter(u => u.id !== id)
  })),
  on(UsuarioActions.setFiltroRol, (state, { rol }) => ({
    ...state,
    filtros: { ...state.filtros, rol }
  })),
  on(UsuarioActions.setFiltroBusqueda, (state, { busqueda }) => ({
    ...state,
    filtros: { ...state.filtros, busqueda }
  }))
);
