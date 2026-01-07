import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Output() close = new EventEmitter<void>();

  // 1. Criamos o FormGroup que representa o formulário como um todo
  taskForm = new FormGroup({
    // 2. Definimos um FormControl para o campo 'title'
    // O primeiro argumento '' é o valor inicial (vazio)
    // O segundo argumento é um array de validadores (obrigatório, mín 3 letras)
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(100)]),
  });

  // Método chamado quando o formulário é enviado
  onSubmit() {
    // Verifica se todos os validadores passaram
    if (this.taskForm.valid) {
      console.log('Nova tarefa:', this.taskForm.value.title);

      // Limpa o formulário após o envio
      this.taskForm.reset();
      this.close.emit();
    } else {
      // Se inválido, marca todos os campos como "tocados" para mostrar os erros no UI
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.taskForm.reset();
    this.close.emit();
  }
}
