
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { 
  lucideCalendar, 
  lucideBookOpenCheck, 
  lucideEuro, 
  lucideSettings2, 
  lucideLanguages, 
  lucidePlus, 
  lucideInfo, 
  lucideReceiptEuro, 
  lucideLogOut, 
  lucideMenu, 
  lucideHouse, 
  lucideBrain, 
  lucideMonitorCheck, 
  lucideMoon, 
  lucideCross,
  lucideLayoutDashboard,
  lucideMousePointerClick,
  lucideUserRoundPlus,
  lucideBookType,
  lucideEye
 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmAvatarModule } from '@spartan-ng/ui-avatar-helm';
import { BrnHoverCardModule } from '@spartan-ng/ui-hovercard-brain';
import { HlmHoverCardModule } from '@spartan-ng/ui-hovercard-helm';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetHeaderComponent,
} from '@spartan-ng/ui-sheet-helm';

import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/ui-accordion-helm';


@Component({
  selector: 'spartan-typography-preview',
  standalone: true,
  providers: [
    provideIcons({ lucideMenu }), 
    provideIcons({ lucideHouse }), 
    provideIcons({ lucidePlus }), 
    provideIcons({ lucideCalendar }), 
    provideIcons({ lucideBookOpenCheck }), 
    provideIcons({ lucideEuro }), 
    provideIcons({ lucideSettings2 }), 
    provideIcons({ lucideBrain }), 
    provideIcons({ lucideMonitorCheck }), 
    provideIcons({ lucideCross }), 
    provideIcons({ lucideLanguages }), 
    provideIcons({ lucideMoon }), 
    provideIcons({ lucideLogOut }), 
    provideIcons({ lucideReceiptEuro }), 
    provideIcons({ lucideInfo }),
    provideIcons({ lucideLayoutDashboard }),
    provideIcons({ lucideMousePointerClick }),
    provideIcons({ lucideUserRoundPlus }),
    provideIcons({ lucideBookType }),
    provideIcons({ lucideEye }),
  ],
  imports: [
    RouterOutlet,
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmSheetDescriptionDirective,
    HlmButtonDirective,
    HlmIconComponent,
    HlmButtonDirective,
    HlmIconComponent,
    BrnHoverCardModule, 
    HlmHoverCardModule, 
    HlmButtonDirective, 
    HlmIconComponent, 
    HlmAvatarModule,
    HlmAvatarImageDirective, 
    HlmAvatarComponent, 
    HlmAvatarFallbackDirective,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentComponent,
    HlmAccordionIconDirective,
    HlmIconComponent,
  ],
  templateUrl: './admin-sidebar-component.html',

})
export class AdminSidebarComponent {

}
