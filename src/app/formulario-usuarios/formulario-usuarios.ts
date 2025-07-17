import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-usuarios',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-usuarios.html',
  styleUrl: './formulario-usuarios.css'
})
export class FormularioUsuariosComponent {
  @Input() usuario: Usuario | null = null;
  @Output() guardar = new EventEmitter<Usuario>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['']
    });
  }

  ngOnChanges() {
    if (this.usuario) {
      this.form.patchValue(this.usuario);
    }
  }

  guardarUsuario() {
    if (this.form.valid) {
      this.guardar.emit({ ...this.usuario, ...this.form.value });
      this.form.reset();
    }
  }
}
