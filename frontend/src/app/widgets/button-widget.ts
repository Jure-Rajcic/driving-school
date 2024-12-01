import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-widget',
  template: `<button (click)="onClick()">Button: {{ label }}</button>`,
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