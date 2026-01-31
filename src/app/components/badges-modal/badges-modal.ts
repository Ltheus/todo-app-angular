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
  newBadgeColor = signal('#5085cfff'); // Default blue

  colors = [
    '#D04848', // Red
    '#e6a94dff', // Orange
    'hsla(51, 89%, 65%, 1.00)', // Yellow
    '#BBCB2E', // Green
    '#5085cfff', // Blue
    '#6938dcff', // Purple
    '#F075AE', // Pink
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
