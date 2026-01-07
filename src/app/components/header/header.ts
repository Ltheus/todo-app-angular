import { Component, HostListener, signal } from '@angular/core';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-header',
  imports: [TaskForm],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.isModalOpen()) {
      this.closeModal();
    }
  }
}
