import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'button-widget',
  template: `<button (click)="onClick()">button: {{ label }}</button>`,
})
export class ButtonWidgetComponent {
  @Input() label: string = '';
  @Input() action!: () => void;

  constructor() {
    console.log('ButtonWidgetComponent created');
  }

  onClick() {
    if (this.action) this.action();
  }
}