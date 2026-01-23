import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeService } from '../../services/badge.service';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-badges-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './badges-modal.html',
  styleUrl: './badges-modal.css',
})
export class BadgesModal {
  readonly lixinho = Trash2;
  badgeService = inject(BadgeService);

  newBadgeName = signal('');
  newBadgeColor = signal('#3b82f6'); // Default blue

  colors = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // green
    '#f59e0b', // Yellow
    '#8b5cf6', // Violet
    '#ec4899', // Pink
    '#6b7280', // Gray
  ];

  addBadge() {
    if (this.newBadgeName().trim()) {
      this.badgeService.addBadge(this.newBadgeName(), this.newBadgeColor());
      this.newBadgeName.set('');
    }
  }

  deleteBadge(id: string) {
    this.badgeService.deleteBadge(id);
  }

  close() {
    this.badgeService.closeModal();
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey() {
    if (this.badgeService.isModalOpen()) {
      this.close();
    }
  }
}
