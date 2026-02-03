import { Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task, TaskService } from '../../services/task.service';
import { BadgeService } from '../../services/badge.service';
import { Calendar, LucideAngularModule, Pencil, Trash } from 'lucide-angular';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [LucideAngularModule, DatePipe],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  readonly lapisinho = Pencil;
  readonly lixeirinha = Trash;
  readonly calendariozinho = Calendar;
  @Input({ required: true }) task!: Task;

  private taskService = inject(TaskService);
  private badgeService = inject(BadgeService);

  getBadge(id: string) {
    return this.badgeService.badges().find((b) => b.id === id);
  }

  onEdit() {
    this.taskService.startEditing(this.task);
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id);
  }

  onToggle() {
    this.taskService.toggleCompletion(this.task.id);
  }

  isLate(): boolean {
    if (this.task.completed) {
      return false;
    }
    if (!this.task.dueDate) {
      return false;
    }
    const dueDate = new Date(this.task.dueDate);
    const today = new Date();
    return dueDate < today;
  }
}
