import { Component } from '@angular/core';
import { AlertPreviewComponent } from './../../alert-preview-component';
import TypographyPreviewComponent from './../../text-component';


@Component({
  standalone: true,
  imports: [AlertPreviewComponent, TypographyPreviewComponent],
  selector: 'app-root',
  templateUrl: './dummy-view-component.component.html'
})


export class DummyViewComponentComponent {
  title = 'frontend';
}