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
  selector: 'appointment-dialog-request-appointments',
  standalone: true,
  templateUrl: './appointment-dialog-request-appointments.html',
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
export class AppointmentDialogRequestAppointmentsComponent {

  protected IsRequestAppointmentsEnabled = signal(false);
  protected readonly appointmentsSelectionLowerLimit = 3;
  protected readonly appointmentsSelectionUpperLimit = 10;
  
  private _selectedAppointments: AppointmentDTO[] = [];
  @Input({ required: true }) set selectedAppointments(value: AppointmentDTO[]) {
    this._selectedAppointments = value;
    this.setIsRequestAppointmentsEnabled();
  }

  private setIsRequestAppointmentsEnabled() {
    let condition = this._selectedAppointments!.length >= this.appointmentsSelectionLowerLimit;
    condition &&= this._selectedAppointments!.length <= this.appointmentsSelectionUpperLimit;
    this.IsRequestAppointmentsEnabled.set(condition);
  }


  
  @Output() private readonly onAppointmentsRequested = new EventEmitter<AppointmentDTO[]>();

  public tryRequestingAppointments(): boolean {
    if (!this.IsRequestAppointmentsEnabled()) {
      alert('Hmm, admin probably removed some of the appointments you selected while you were confirming requests. Please close the dialog and try again, should be good now.');
      return false;
    } else {
      this.onAppointmentsRequested.emit(this._selectedAppointments);
      return true;
    }
  }
}
