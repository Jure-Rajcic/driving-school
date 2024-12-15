import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';
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
  HlmAlertDialogTitleDirective,
} from '@spartan-ng/ui-alertdialog-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';

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
  protected _nCreated = signal(0);
  @Input() set nCreated(value: number) {
    this._nCreated.set(value);
    console.log('nCreated', value);
  }

  protected _nDeleted = signal(0);
  @Input() set nDeleted(value: number) {
    this._nDeleted.set(value);
    console.log('nDeleted', value);
  }

  @Output()
  protected readonly saveChanges = new EventEmitter<undefined>();

  public trySavingAppointmentManagementChanges(): boolean {
    if (!this._nCreated() && !this._nDeleted()) {
      alert('No changes to save');
      return false;
    } else {
      this.saveChanges.emit();
      return true;
    }
  }
}
