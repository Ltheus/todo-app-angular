import { Component, HostListener, inject } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-header',
  imports: [TaskForm],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private taskService = inject(TaskService);

  protected isModalOpen = this.taskService.isModalOpen;

  openModal() {
    this.taskService.startAdding();
  }

  closeModal() {
    this.taskService.closeModal();
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }
}
