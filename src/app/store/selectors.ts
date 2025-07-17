import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducers';

export const selectUsuarioState = createFeatureSelector<State>('usuarios');

export const selectAllUsuarios = createSelector(
  selectUsuarioState,
  state => state.usuarios
);

export const selectLoading = createSelector(
  selectUsuarioState,
  state => state.loading
);

export const selectError = createSelector(
  selectUsuarioState,
  state => state.error
);

export const selectPaginatedUsuarios = (page: number, pageSize: number) =>
  createSelector(
    selectUsuariosFiltrados,
    (usuarios) => {
      const start = (page - 1) * pageSize;
      return usuarios.slice(start, start + pageSize);
    }
);

export const selectTotalPages = (pageSize: number) =>
  createSelector(
    selectUsuariosFiltrados,
    (usuarios) => Math.ceil(usuarios.length / pageSize)
);

export const selectFiltros = createSelector(
  selectUsuarioState,
  state => state.filtros
);

export const selectUsuariosFiltrados = createSelector(
  selectUsuarioState,
  selectFiltros,
  (state, filtros) => {
    let lista = state.usuarios;

    if (filtros.rol) {
      lista = lista.filter(u => u.rol === filtros.rol);
    }

    if (filtros.busqueda.trim() !== '') {
      const busquedaLower = filtros.busqueda.toLowerCase();
      lista = lista.filter(
        u =>
          u.nombre.toLowerCase().includes(busquedaLower) ||
          u.apellido.toLowerCase().includes(busquedaLower)
      );
    }

    return lista;
  }
);