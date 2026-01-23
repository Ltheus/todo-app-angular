import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Estado das Tarefas
  tasks = signal<Task[]>([]);

  // Estado do Modal
  isModalOpen = signal(false);

  // Estado da Edição (se null, é uma nova tarefa)
  editingTask = signal<Task | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();

      // Salva automaticamente sempre que 'tasks' mudar
      effect(() => {
        const currentTasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
      });
    }
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks.set(JSON.parse(saved));
    } else {
      // Dados iniciais de exemplo apenas se não houver nada salvo
      this.tasks.set([
        {
          id: '1',
          title: 'Aprender Angular',
          description: 'Estudar Signals e Standalone Components',
          completed: false,
        },
        {
          id: '2',
          title: 'Criar To-Do App',
          description: 'Aplicar conhecimentos num projeto real',
          completed: false,
        },
      ]);
    }
  }

  // Ações do Modal
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.editingTask.set(null); // Limpa a edição ao fechar
  }

  startAdding() {
    this.editingTask.set(null);
    this.openModal();
  }

  startEditing(task: Task) {
    this.editingTask.set(task);
    this.openModal();
  }

  // Ações de Tarefa
  addTask(title: string, description: string, dueDate?: string) {
    const newTask: Task = {
      id: crypto.randomUUID(), // Gera ID único
      title,
      description,
      completed: false,
      dueDate,
    };

    this.tasks.update((tasks) => [...tasks, newTask]);
    this.closeModal();
  }

  updateTask(id: string, title: string, description: string, dueDate?: string) {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, title, description, dueDate } : t)),
    );
    this.closeModal();
  }

  deleteTask(id: string) {
    this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  toggleCompletion(id: string) {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }
}
