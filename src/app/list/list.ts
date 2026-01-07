import { Component, inject } from '@angular/core';
import { ListItem } from '../components/list-item/list-item';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  protected taskService = inject(TaskService);
}
