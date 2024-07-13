import { Component } from '@angular/core';

@Component({
  selector: '[app-button]',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="[slot=icon]"></ng-content>
    <ng-content select="[slot=label]"></ng-content>
  `,
  styleUrl: './button.component.scss',
  host: {
    class: 'btn',
  },
})
export class ButtonComponent {}
