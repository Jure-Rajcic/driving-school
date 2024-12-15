import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Shared from '@shared/dtos';
console.log('All constants:', Shared);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})

export class AppComponent {
  title = 'JR-driving-school'
}