import { Component, computed, inject } from '@angular/core';
import { ListItem } from '../../components/list-item/list-item';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  protected taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private routeData = toSignal(this.route.data);

  filterType = computed(() => this.routeData()?.['filter'] || 'all');

  filteredTasks = computed(() => {
    const filter = this.filterType();
    const tasks = this.taskService.tasks();

    switch (filter) {
      case 'pending':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  });
}
