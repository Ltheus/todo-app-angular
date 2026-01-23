import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Badge {
  id: string;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  badges = signal<Badge[]>([]);
  isModalOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();

      effect(() => {
        const currentBadges = this.badges();
        localStorage.setItem('badges', JSON.stringify(currentBadges));
      });
    }
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('badges');
    if (saved) {
      this.badges.set(JSON.parse(saved));
    } else {
      // Default badges
      this.badges.set([
        { id: crypto.randomUUID(), name: 'Casa', color: '#ff4444' },
        { id: crypto.randomUUID(), name: 'Trabalho', color: '#4444ff' },
      ]);
    }
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  addBadge(name: string, color: string) {
    const newBadge: Badge = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    this.badges.update((badges) => [...badges, newBadge]);
  }

  deleteBadge(id: string) {
    this.badges.update((badges) => badges.filter((b) => b.id !== id));
  }
}
