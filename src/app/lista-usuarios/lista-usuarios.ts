import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css'
})
export class ListaUsuariosComponent {
  @Input() usuarios: Usuario[] = [];
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 1;

  @Output() editar = new EventEmitter<Usuario>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() cambiarPagina = new EventEmitter<number>();

  paginas(): number[] {
    return Array(this.totalPaginas).fill(0).map((_, i) => i + 1);
  }
}

