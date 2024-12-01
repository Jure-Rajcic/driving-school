import { Component, Input } from '@angular/core';

@Component({
  selector: 'paragraph-widget',
  template: `<p>Paragraph: {{ content }}</p>`,
})
export class ParagraphWidgetComponent {
  @Input() content: string = '';

  constructor() {
    console.log('ParagraphWidgetComponent created');
  }
}