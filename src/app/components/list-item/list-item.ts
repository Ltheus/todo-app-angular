import { Component, inject, Input } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  @Input({ required: true }) task!: Task;

  private taskService = inject(TaskService);

  onEdit() {
    this.taskService.startEditing(this.task);
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id);
  }
}
