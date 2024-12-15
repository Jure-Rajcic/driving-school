import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideCircleX } from '@ng-icons/lucide';
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

enum AppointmentAcceptMode {
  ACCEPT_SINGLE,
  ACCEPT_ALL_SELECTED,
}

@Component({
  selector: 'appointment-confirmation-dialog-accept-confirmation',
  standalone: true,
  templateUrl: './appointment-confirmation-dialog-accept-confirmation.html',
  providers: [provideIcons({ lucideCircleCheck })],
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
export class AppointmentConfirmationDialogAcceptConfirmationComponent {

  AppointmentAcceptMode = AppointmentAcceptMode;
  protected mode = signal<AppointmentAcceptMode | undefined>(undefined);
  protected title = signal<string | undefined>(undefined);
  protected acceptingRowAction: () => void = () => {};

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
        ? AppointmentAcceptMode.ACCEPT_SINGLE
        : AppointmentAcceptMode.ACCEPT_ALL_SELECTED;
      this.mode.set(initialMode);

      switch (initialMode) {
        case AppointmentAcceptMode.ACCEPT_SINGLE:
          this.title.set('Accept clicked');
          this.acceptingRowAction = this.rejectClickedRow.bind(this);
          break;
        case AppointmentAcceptMode.ACCEPT_ALL_SELECTED:
          this.title.set('Accept all selected appointments');
          this.acceptingRowAction = this.rejectAllSelectedRows.bind(this);
          break;
        default:
          this.title.set(undefined);
          console.error('Invalid deletion mode');
      }
  }

  @Output() private readonly confirmationAccepted = new EventEmitter<Row[]>();

  protected tryAccepting(): boolean {
    if (!this._clickedRow || !this._selectedRows || this.mode() === undefined) {
      alert('Something went wrong, please close the dialog and try again');
      return false;
    } else {
      this.acceptingRowAction();
      return true;
    }
  }

  private rejectRows(appointments: Row[]): void {
    this.confirmationAccepted.emit(appointments);
  }

  private rejectAllSelectedRows(): void {
    this.rejectRows(this._selectedRows!);
  }

  private rejectClickedRow(): void {
    this.rejectRows([this._clickedRow!]);
  }
}
