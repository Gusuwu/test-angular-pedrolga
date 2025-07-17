import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../models/Usuario';
import { Store } from '@ngrx/store';
import * as UsuarioActions from '../store/actions';
import * as UsuarioSelectors from '../store/selectors';
import { LoadingComponent } from '../loading/loading';
import { FormularioUsuariosComponent } from '../formulario-usuarios/formulario-usuarios';
import { ListaUsuariosComponent } from "../lista-usuarios/lista-usuarios";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    FormularioUsuariosComponent,
    LoadingComponent, ListaUsuariosComponent],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent {
  form: FormGroup;
  formFiltros: FormGroup;
  roles = ['Admin', 'User'];
  page = signal(1);
  pageSize = 10;
  
  usuario = signal<Usuario | null>(null);

  loading$;
  error$;
  usuarios$;
  totalPages$;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['']
    });

    this.formFiltros = this.fb.group({
      rol: [''],
      busqueda: ['']
    });

    this.loading$ = this.store.selectSignal(UsuarioSelectors.selectLoading);
    this.error$ = this.store.selectSignal(UsuarioSelectors.selectError);
    this.usuarios$ = computed(() => 
      this.store.selectSignal(UsuarioSelectors.selectPaginatedUsuarios(this.page(), this.pageSize))()
    );
    this.totalPages$ = this.store.selectSignal(
      UsuarioSelectors.selectTotalPages(this.pageSize)
    );

    this.store.dispatch(UsuarioActions.loadUsers());

    this.formFiltros.get('rol')?.valueChanges.subscribe(rol => {
      this.store.dispatch(UsuarioActions.setFiltroRol({ rol: rol || null }));
      this.page.set(1);
    });

    this.formFiltros.get('busqueda')?.valueChanges.subscribe(busqueda => {
      this.store.dispatch(UsuarioActions.setFiltroBusqueda({ busqueda: busqueda ?? '' }));
      this.page.set(1);
    });
  }

  guardarUsuario(usuario: Usuario) {
    if (usuario.id) {
      this.store.dispatch(UsuarioActions.updateUser({ usuario }));
    } else {
      this.store.dispatch(UsuarioActions.addUser({ usuario }));
    }
    this.usuario.set(null);
  }

  editarUsuario(usuario: Usuario) {
    this.usuario.set(usuario);
  }

  eliminarUsuario(id: number) {
    this.store.dispatch(UsuarioActions.deleteUser({ id }));
  }

  cambiarPagina(direccion: 'next' | 'prev') {
    if (direccion === 'next' && this.page() < this.totalPages$()) {
      this.page.set(this.page() + 1);
    } else if (direccion === 'prev' && this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }
}