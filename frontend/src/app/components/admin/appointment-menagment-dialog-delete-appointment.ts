import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
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

enum AppointmentDeletionMode {
  DELETING_SINGLE,
  DELETING_ALL_SELECTED,
}

@Component({
  selector: 'appointment-menagment-dialog-delete-appointment',
  standalone: true,
  templateUrl: './appointment-menagment-dialog-delete-appointment.html',
  providers: [provideIcons({ lucideTrash2 })],
  imports: [
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogOverlayDirective,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,
    HlmButtonDirective,
    HlmIconComponent,
  ],
})
export class AppointmentMenagmentDialogDeleteAppointmentComponent {

  AppointmentDeletionMode = AppointmentDeletionMode;
  protected mode = signal<AppointmentDeletionMode | undefined>(undefined);
  protected title = signal<string | undefined>(undefined);
  protected deleteAppointmentAction: () => void = () => {};

  private _appointment: AppointmentDTO | undefined;
  @Input({ required: true }) 
  set appointment(value: AppointmentDTO) {
    this._appointment = value;
    this.setMode();
  }

  private _selectedAppointments: AppointmentDTO[] | undefined;
  @Input({ required: true }) 
  set selectedAppointments(value: AppointmentDTO[]) {
    this._selectedAppointments = value;
    this.setMode();
  }

  private setMode(): void {
    if (!this._appointment || !this._selectedAppointments) return;
      const initialMode = !this._selectedAppointments.includes(this._appointment)
        ? AppointmentDeletionMode.DELETING_SINGLE
        : AppointmentDeletionMode.DELETING_ALL_SELECTED;
      this.mode.set(initialMode);

      switch (initialMode) {
        case AppointmentDeletionMode.DELETING_SINGLE:
          this.title.set('Delete appointment');
          this.deleteAppointmentAction = this.deleteAppointment.bind(this);
          break;
        case AppointmentDeletionMode.DELETING_ALL_SELECTED:
          this.title.set('Delete all selected appointments');
          this.deleteAppointmentAction = this.deleteAllSelectedAppointments.bind(this);
          break;
        default:
          this.title.set(undefined);
          console.error('Invalid deletion mode');
      }
  }

  @Output() private readonly onAppointmentsDeleted = new EventEmitter<AppointmentDTO[]>();

  protected tryDeleteAppointmentLoccaly(): boolean {
    if (!this._appointment || !this._selectedAppointments || this.mode() === undefined) {
      alert('Something went wrong, please close the dialog and try again');
      return false;
    } else {
      this.deleteAppointmentAction();
      return true;
    }
  }

  private deleteAppointments(appointments: AppointmentDTO[]): void {
    this.onAppointmentsDeleted.emit(appointments);
  }

  private deleteAllSelectedAppointments(): void {
    this.deleteAppointments(this._selectedAppointments!);
  }

  private deleteAppointment(): void {
    this.deleteAppointments([this._appointment!]);
  }
}
