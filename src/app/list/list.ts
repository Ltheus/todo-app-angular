import { Component } from '@angular/core';
import { ListItem } from '../components/list-item/list-item';

@Component({
  selector: 'app-list',
  imports: [ListItem],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {}
