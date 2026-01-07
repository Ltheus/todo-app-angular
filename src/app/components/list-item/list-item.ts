import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  @Input() title: string = 'Titulo';
  @Input() description: string = 'Descrição';
}
