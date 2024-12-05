import { Component, inject } from "@angular/core"
import { AppSvgComponent } from "src/app/components/app-svg-component";
import { provideIcons } from '@ng-icons/core';
import { lucideCalendar } from '@ng-icons/lucide';
import { HlmAvatarModule } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnHoverCardModule } from '@spartan-ng/ui-hovercard-brain';
import { HlmHoverCardModule } from '@spartan-ng/ui-hovercard-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { hlmH1, hlmLead } from './../../../../../libs/ui/ui-typography-helm/src/index'

interface screen {
  id: number,
  baseFileName: string,
  label: string,
}

@Component({
  standalone: true,
  imports: [AppSvgComponent, BrnHoverCardModule, HlmHoverCardModule, HlmAvatarModule, CommonModule],
  selector: 'app-root',
  templateUrl: './monitoring-view-component.component.html',
})
export class MonitoringViewComponent {
  hlmH1 = hlmH1;
  hlmLead = hlmLead;

  screens: screen[] = [
    { id: 1, baseFileName: "[1]medical-examination", label: "Medical Examination" },
    { id: 2, baseFileName: "[2]psycho-test", label: "Psycho Test" },
    { id: 3, baseFileName: "[3]chose-category", label: "Choose Category" },
    { id: 4, baseFileName: "[4]listen-lectures", label: "Listen Lectures" },
    { id: 5, baseFileName: "[5]regulations-test", label: "Regulations Test" },
    { id: 6, baseFileName: "[6]listen-lectures", label: "Listen Lectures" },
    { id: 7, baseFileName: "[7]first-aid-test", label: "First Aid Test" },
    { id: 8, baseFileName: "[8]choosing-vehicle", label: "Choosing Vehicle" },
    { id: 9, baseFileName: "[9]practise-driving", label: "Practice Driving" },
    { id: 10, baseFileName: "[10]driving-test", label: "Driving Test" },
    { id: 11, baseFileName: "[11]getting-driver-licence", label: "Getting Driver Licence" }
  ]

  router = inject(Router);

  handleClick(screen: screen): void {
    this.router.navigate([`/admin/monitoring/${screen.id}`]);
  }
}
