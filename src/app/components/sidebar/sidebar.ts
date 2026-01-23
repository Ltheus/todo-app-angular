import { Component, HostListener, Inject, PLATFORM_ID, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  LucideAngularModule,
  Moon,
  Sun,
  ChevronsLeft,
  ChevronsRight,
  List,
  Clock,
  CheckCircle,
  Tag,
} from 'lucide-angular';
import { BadgeService } from '../../services/badge.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly luazinha = Moon;
  readonly solzinho = Sun;
  readonly esquerdinha = ChevronsLeft;
  readonly direitinha = ChevronsRight;
  readonly listinha = List;
  readonly reloginho = Clock;
  readonly checkinho = CheckCircle;
  readonly taguinha = Tag;

  badgeService = inject(BadgeService);

  isDarkMode = signal(false);
  isCollapsed = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.setDarkMode(true);
    } else {
      this.setDarkMode(false);
    }
  }

  toggleTheme() {
    this.setDarkMode(!this.isDarkMode());
  }

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  private setDarkMode(isDark: boolean) {
    this.isDarkMode.set(isDark);
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.altKey && event.key === 'd') {
      event.preventDefault();
      this.setDarkMode(!this.isDarkMode());
    }
  }
}
