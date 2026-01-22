import { AfterViewInit, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements AfterViewInit {
  private taskService = inject(TaskService);
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(100)]),
  });

  constructor() {
    // Reage a mudanças na tarefa em edição
    effect(() => {
      const taskToEdit = this.taskService.editingTask();
      if (taskToEdit) {
        this.taskForm.patchValue({
          title: taskToEdit.title,
          description: taskToEdit.description,
        });
      } else {
        this.taskForm.reset();
      }
    });
  }

  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const title = this.taskForm.value.title!;
      const description = this.taskForm.value.description || '';
      const editingTask = this.taskService.editingTask();

      if (editingTask) {
        this.taskService.updateTask(editingTask.id, title, description);
      } else {
        this.taskService.addTask(title, description);
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.taskService.closeModal();
  }
}
