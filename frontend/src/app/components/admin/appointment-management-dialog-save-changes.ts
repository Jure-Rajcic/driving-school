import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';
import { AppointmentDTO } from '@shared/dtos';
import {
  BrnAlertDialogContentDirective,
  BrnAlertDialogTriggerDirective,
} from '@spartan-ng/ui-alertdialog-brain';
import {
  HlmAlertDialogActionButtonDirective,
  HlmAlertDialogCancelButtonDirective,
  HlmAlertDialogComponent,
  HlmAlertDialogContentComponent,
  HlmAlertDialogDescriptionDirective,
  HlmAlertDialogFooterComponent,
  HlmAlertDialogHeaderComponent,
  HlmAlertDialogOverlayDirective,
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmTooltipComponent, HlmTooltipTriggerDirective } from '@spartan-ng/ui-tooltip-helm';

@Component({
  selector: 'appointment-management-dialog-save-changes',
  standalone: true,
  templateUrl: './appointment-management-dialog-save-changes.html',
  providers: [provideIcons({ lucideTrash2 })],
  imports: [
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,
    HlmButtonDirective,
    CommonModule,
  ],
})
export class AppointmentManagementDialogSaveChangesComponent {
  @Input({ required: true })
  public locallyDeletedAppointments: AppointmentDTO[] | undefined;

  @Input({ required: true })
  public locallyCreatedAppointments: AppointmentDTO[] | undefined;

  @Input({ required: true })
  public IsSaveChangesEnabled: boolean | undefined;

  @Output() private readonly onSaveChanges = new EventEmitter<any>();

  public trySavingAppointmentManagementChanges(): boolean {
    if (!this.IsSaveChangesEnabled) {
      alert('No changes to save');
      return false;
    } else {
      this.onSaveChanges.emit({});
      return true;
    }
  }
}
