import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleX } from '@ng-icons/lucide';
import { AppointmentConfirmationDTO, AppointmentDTO } from '@shared/dtos';
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
import { Row } from './appointment-confirmation-data-table';

enum AppointmentRejectionMode {
  REJECT_SINGLE,
  REJECT_ALL_SELECTED,
}

@Component({
  selector: 'appointment-confirmation-dialog-reject-confirmation',
  standalone: true,
  templateUrl: './appointment-confirmation-dialog-reject-confirmation.html',
  providers: [provideIcons({ lucideCircleX })],
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
    HlmIconComponent,
  ],
})
export class AppointmentConfirmationDialogRejectConfirmationComponent {

  AppointmentRejectionMode = AppointmentRejectionMode;
  protected mode = signal<AppointmentRejectionMode | undefined>(undefined);
  protected title = signal<string | undefined>(undefined);
  protected rejectingRowAction: () => void = () => {};

  private _clickedRow: Row | undefined;
  @Input({ required: true }) 
  set clickedRow(value: Row) {
    console.log('clickedRow', value);
    this._clickedRow = value;
    this.setMode();
  }

  private _selectedRows: Row[] | undefined;
  @Input({ required: true }) 
  set selectedRows(value: Row[]) {
    console.log('selectedRows', value);
    this._selectedRows = value;
    this.setMode();
  }

  private setMode(): void {
    if (!this._clickedRow || !this._selectedRows) return;
      const initialMode = !this._selectedRows.includes(this._clickedRow)
        ? AppointmentRejectionMode.REJECT_SINGLE
        : AppointmentRejectionMode.REJECT_ALL_SELECTED;
      this.mode.set(initialMode);

      switch (initialMode) {
        case AppointmentRejectionMode.REJECT_SINGLE:
          this.title.set('Reject clicked');
          this.rejectingRowAction = this.rejectClickedRow.bind(this);
          break;
        case AppointmentRejectionMode.REJECT_ALL_SELECTED:
          this.title.set('Reject all selected appointments');
          this.rejectingRowAction = this.rejectAllSelectedRows.bind(this);
          break;
        default:
          this.title.set(undefined);
          console.error('Invalid deletion mode');
      }
  }

  @Output() private readonly confirmationRejected = new EventEmitter<Row[]>();

  protected tryRejectingRow(): boolean {
    if (!this._clickedRow || !this._selectedRows || this.mode() === undefined) {
      alert('Something went wrong, please close the dialog and try again');
      return false;
    } else {
      this.rejectingRowAction();
      return true;
    }
  }

  private rejectRows(appointments: Row[]): void {
    this.confirmationRejected.emit(appointments);
  }

  private rejectAllSelectedRows(): void {
    this.rejectRows(this._selectedRows!);
  }

  private rejectClickedRow(): void {
    this.rejectRows([this._clickedRow!]);
  }
}
