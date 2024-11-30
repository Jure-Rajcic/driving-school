import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'paragraph-widget',
  template: `<p>paragraph: {{ content }}</p>`,
})
export class ParagraphWidgetComponent {
  @Input() content: string = '';

  constructor() {
    console.log('ParagraphWidgetComponent created');
  }
}