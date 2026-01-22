import { Routes } from '@angular/router';
import { List } from './pages/list/list';

export const routes: Routes = [
  { path: '', component: List, data: { filter: 'all' } },
  { path: 'pending', component: List, data: { filter: 'pending' } },
  { path: 'completed', component: List, data: { filter: 'completed' } },
  //   { path: '**', redirectTo: '' },
];
