import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="[slot=icon]"></ng-content>
    <ng-content select="[slot=label]"></ng-content>
  `,
  styleUrl: './button.component.scss',
  host: {
    '[class]': 'btnClasses()',
    '(click)': 'onClick.emit()',
  },
})
export class ButtonComponent {
  severity = input<'primary' | 'secondary' | 'icon'>('primary');
  styleClass = input<string>();

  onClick = output();

  protected btnClasses = computed(
    () => `btn btn--${this.severity()} ${this.styleClass() || ''}`
  );
}
