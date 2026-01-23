import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { List } from './pages/list/list';
import { BadgesModal } from './components/badges-modal/badges-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, List, BadgesModal],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('to-do-app');
}
