
import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideBookOpenCheck, lucideEuro, lucideSettings2, lucidePlus, lucideMenu, lucideHouse} from '@ng-icons/lucide';
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



@Component({
  selector: 'spartan-typography-preview',
  standalone: true,
  providers: [provideIcons({ lucideMenu }), provideIcons({ lucideHouse }), provideIcons({ lucidePlus }), provideIcons({ lucideCalendar }), provideIcons({ lucideBookOpenCheck }), provideIcons({ lucideEuro }), provideIcons({ lucideSettings2 })],
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
  ],
  templateUrl: './sidebar-component.html',

})
export default class SidebarComponent {

}
