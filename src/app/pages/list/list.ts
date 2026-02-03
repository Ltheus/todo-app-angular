import { Component, computed, inject } from '@angular/core';
import { ListItem } from '../../components/list-item/list-item';
import { TaskService } from '../../services/task.service';
import { BadgeService } from '../../services/badge.service';
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
  protected badgeService = inject(BadgeService);
  private route = inject(ActivatedRoute);
  private routeData = toSignal(this.route.data);

  filterType = computed(() => this.routeData()?.['filter'] || 'all');

  filteredTasks = computed(() => {
    const filter = this.filterType();
    const tasks = this.taskService.tasks();
    const badgeIds = this.badgeService.filterBadgeIds();
    const noBadges = this.badgeService.filterNoBadges();

    // 1. Filter by Route (Pending/Completed)
    let result = tasks;
    switch (filter) {
      case 'pending':
        result = result.filter((task) => !task.completed);
        break;
      case 'completed':
        result = result.filter((task) => task.completed);
        break;
    }

    // 2. Filter by Badges (if any filter is active)
    if (badgeIds.length > 0 || noBadges) {
      result = result.filter((task) => {
        const hasNoBadges = !task.badgeIds || task.badgeIds.length === 0;

        // If "No Label" is checked, include tasks with no badges
        if (noBadges && hasNoBadges) {
          return true;
        }

        // If specific badges are checked, include tasks that match ANY of them
        if (badgeIds.length > 0 && task.badgeIds) {
          return task.badgeIds.some((id) => badgeIds.includes(id));
        }

        return false;
      });
    }

    return result;
  });
}
