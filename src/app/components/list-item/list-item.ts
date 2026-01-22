import { Component, inject, Input } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { LucideAngularModule, Pencil, Trash } from 'lucide-angular';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  readonly lapisinho = Pencil;
  readonly lixeirinha = Trash;
  @Input({ required: true }) task!: Task;

  private taskService = inject(TaskService);

  onEdit() {
    this.taskService.startEditing(this.task);
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id);
  }

  onToggle() {
    this.taskService.toggleCompletion(this.task.id);
  }
}
