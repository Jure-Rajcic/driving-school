import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { hlmH1 } from './../../libs/ui/ui-typography-helm/src/lib/hlm-h1.directive';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <h1>The Joke Tax Chronicles</h1> 
    <h1 class="${hlmH1}">The Joke Tax Chronicles</h1>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
