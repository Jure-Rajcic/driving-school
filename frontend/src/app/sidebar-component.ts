
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideBookOpenCheck, lucideEuro, lucideSettings2, lucideLanguages, lucidePlus, lucideInfo, lucideReceiptEuro, lucideLogOut, lucideMenu, lucideHouse, lucideBrain, lucideMonitorCheck, lucideMoon, lucideCross } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSheetContentDirective, BrnSheetTriggerDirective } from '@spartan-ng/ui-sheet-brain';
import { HlmAvatarModule } from '@spartan-ng/ui-avatar-helm';
import { BrnHoverCardModule } from '@spartan-ng/ui-hovercard-brain';
import { HlmHoverCardModule } from '@spartan-ng/ui-hovercard-helm';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import {
  HlmSheetComponent,
  HlmSheetContentComponent,
  HlmSheetDescriptionDirective,
  HlmSheetFooterComponent,
  HlmSheetHeaderComponent,
  HlmSheetTitleDirective,
} from '@spartan-ng/ui-sheet-helm';
import {
  BrnCollapsibleComponent,
  BrnCollapsibleContentComponent,
  BrnCollapsibleTriggerDirective,
} from '@spartan-ng/ui-collapsible-brain';

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
  providers: [provideIcons({ lucideMenu }), provideIcons({ lucideHouse }), provideIcons({ lucidePlus }), provideIcons({ lucideCalendar }), provideIcons({ lucideBookOpenCheck }), provideIcons({ lucideEuro }), provideIcons({ lucideSettings2 }), 
    provideIcons({ lucideBrain }), provideIcons({ lucideMonitorCheck }), provideIcons({ lucideCross }), provideIcons({ lucideLanguages }), provideIcons({ lucideMoon }), provideIcons({ lucideLogOut }), provideIcons({ lucideReceiptEuro }), provideIcons({ lucideInfo })],
  imports: [
    BrnSheetTriggerDirective,
    BrnSheetContentDirective,
    HlmSheetComponent,
    HlmSheetContentComponent,
    HlmSheetHeaderComponent,
    HlmSheetFooterComponent,
    HlmSheetTitleDirective,
    HlmSheetDescriptionDirective,
    HlmButtonDirective,
    HlmInputDirective,
    HlmIconComponent,
    HlmLabelDirective,
    BrnCollapsibleComponent,
    BrnCollapsibleContentComponent,
    BrnCollapsibleTriggerDirective,
    HlmButtonDirective,
    HlmIconComponent,
    BrnHoverCardModule, HlmHoverCardModule, HlmButtonDirective, HlmIconComponent, HlmAvatarModule,
    HlmAvatarImageDirective, HlmAvatarComponent, HlmAvatarFallbackDirective,
    HlmAccordionDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmAccordionContentComponent,
    HlmAccordionIconDirective,
    HlmIconComponent,
  ],
  templateUrl: './sidebar-component.html',

})
export default class SidebarComponent {

}
