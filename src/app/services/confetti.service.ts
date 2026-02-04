import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  colors = [
    '#D04848', // Red
    '#e6a94dff', // Orange
    '#f5dd56ff', // Yellow
    '#BBCB2E', // Green
    '#5085cfff', // Blue
    '#6938dcff', // Purple
    '#F075AE', // Pink
  ];
  show(mousePosition: { x: number; y: number }) {
    const defaults = {
      spread: 90,
      angle: 360,
      ticks: 100,
      gravity: 1.5,
      decay: 0.96,
      startVelocity: 40,
      colors: this.colors,
      origin: {
        x: mousePosition.x,
        y: mousePosition.y,
      },
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star'],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ['circle'],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }
}
