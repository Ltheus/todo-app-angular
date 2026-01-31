import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { LucideAngularModule, Plus, X } from 'lucide-angular';
import { TaskService } from '../../services/task.service';
import { BadgeService } from '../../services/badge.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, DatePickerModule, LucideAngularModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements AfterViewInit {
  private taskService = inject(TaskService);
  badgeService = inject(BadgeService);
  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;

  readonly maisinho = Plus;
  readonly xiszinho = X;
  isBadgeSelectorOpen = signal(false);

  taskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.maxLength(100)]),
    badges: new FormControl<string[]>([]),
    hasDueDate: new FormControl(false),
    dueDate: new FormControl({ value: '', disabled: true }),
  });

  constructor() {
    // Reage a mudanças na tarefa em edição
    effect(() => {
      const taskToEdit = this.taskService.editingTask();
      if (taskToEdit) {
        this.taskForm.patchValue({
          title: taskToEdit.title,
          description: taskToEdit.description,
          badges: taskToEdit.badgeIds || [],
          hasDueDate: !!taskToEdit.dueDate,
          dueDate: taskToEdit.dueDate || '',
        });

        if (taskToEdit.dueDate) {
          this.taskForm.controls.dueDate.enable();
        } else {
          this.taskForm.controls.dueDate.disable();
        }
      } else {
        this.taskForm.reset();
      }
    });

    // Listen to checkbox changes
    this.taskForm.controls.hasDueDate.valueChanges.subscribe((hasDate) => {
      if (hasDate) {
        this.taskForm.controls.dueDate.enable();
      } else {
        this.taskForm.controls.dueDate.disable();
        this.taskForm.controls.dueDate.reset();
      }
    });
  }

  ngAfterViewInit() {
    this.titleInput.nativeElement.focus();
  }

  toggleBadge(badgeId: string) {
    const currentBadges = this.taskForm.controls.badges.value || [];
    if (currentBadges.includes(badgeId)) {
      this.taskForm.controls.badges.setValue(currentBadges.filter((id) => id !== badgeId));
    } else {
      this.taskForm.controls.badges.setValue([...currentBadges, badgeId]);
      this.isBadgeSelectorOpen.set(false); // Close after selection
    }
  }

  toggleSelector() {
    this.isBadgeSelectorOpen.update((v) => !v);
  }

  getBadge(id: string) {
    return this.badgeService.badges().find((b) => b.id === id);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const title = this.taskForm.value.title!;
      const description = this.taskForm.value.description || '';
      // Se hasDueDate for true, usa o valor de dueDate, senão undefined
      // PrimeNG DatePicker geralmente retorna Date object, então formatamos para string ou guardamos timestamp se preferir
      // O input do PrimeNG pode retornar Date. Vamos assumir que queremos string ISO simplificada ou o objeto Date em string.
      // O endpoint original definia dueDate como string. Vamos converter.
      const rawDate = this.taskForm.value.dueDate;
      let dueDate: string | undefined = undefined;

      if (this.taskForm.value.hasDueDate && rawDate) {
        dueDate = new Date(rawDate).toISOString();
      }

      const badgeIds = this.taskForm.value.badges || [];

      const editingTask = this.taskService.editingTask();

      if (editingTask) {
        this.taskService.updateTask(editingTask.id, title, description, dueDate, badgeIds);
      } else {
        this.taskService.addTask(title, description, dueDate, badgeIds);
      }
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.taskService.closeModal();
  }
}
