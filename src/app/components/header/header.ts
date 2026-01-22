import { Component, computed, HostListener, inject } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { TaskService } from '../../services/task.service';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [TaskForm, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  readonly maisinho = Plus;

  private taskService = inject(TaskService);
  protected isModalOpen = this.taskService.isModalOpen;
  private router = inject(Router);
  private currentPage = toSignal(
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd))
  );

  title = computed(() => {
    const page = this.currentPage(); //const para "escutar" o signal wtf bizarroooo
    const url = this.router.url;

    if (url.includes('pending')) return 'Pendentes';
    if (url.includes('completed')) return 'Concluídas';
    return 'Todas';
  });

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
