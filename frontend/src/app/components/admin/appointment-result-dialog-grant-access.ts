import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideCircleX } from '@ng-icons/lucide';
import { AppointmentConfirmationDTO, AppointmentDTO, ClientDTO } from '@shared/dtos';
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

enum ResultMode {
  GRANT_SINGLE,
  GRANT_ALL_SELECTED,
}

@Component({
  selector: 'appointment-result-dialog-grant-access',
  standalone: true,
  templateUrl: './appointment-result-dialog-grant-access.html',
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
export class AppointmentCResultDialogGrantAccessComponent {

  protected mode = signal<ResultMode | undefined>(undefined);
  protected title = signal<string | undefined>(undefined);
  protected grantingRowAction: () => void = () => {};

  private _clickedRow: ClientDTO | undefined;
  @Input({ required: true }) 
  set clickedRow(value: ClientDTO) {
    console.log('clickedRow', value);
    this._clickedRow = value;
    this.setMode();
  }

  private _selectedRows: ClientDTO[] | undefined;
  @Input({ required: true }) 
  set selectedRows(value: ClientDTO[]) {
    console.log('selectedRows', value);
    this._selectedRows = value;
    this.setMode();
  }

  private setMode(): void {
    if (!this._clickedRow || !this._selectedRows) return;
      const initialMode = !this._selectedRows.includes(this._clickedRow)
        ? ResultMode.GRANT_SINGLE
        : ResultMode.GRANT_ALL_SELECTED;
      this.mode.set(initialMode);

      switch (initialMode) {
        case ResultMode.GRANT_SINGLE:
          this.title.set('Grant clicked');
          this.grantingRowAction = this.grantClickedRow.bind(this);
          break;
        case ResultMode.GRANT_ALL_SELECTED:
          this.title.set('Grant all selected appointments');
          this.grantingRowAction = this.grantAllSelectedRows.bind(this);
          break;
        default:
          this.title.set(undefined);
          console.error('Invalid result mode');
      }
  }

  @Output() private readonly accessGranted = new EventEmitter<ClientDTO[]>();

  protected tryGrantingRow(): boolean {
    if (!this._clickedRow || !this._selectedRows || this.mode() === undefined) {
      alert('Something went wrong, please close the dialog and try again');
      return false;
    } else {
      this.grantingRowAction();
      return true;
    }
  }

  private grantRows(appointments: ClientDTO[]): void {
    this.accessGranted.emit(appointments);
  }

  private grantAllSelectedRows(): void {
    this.grantRows(this._selectedRows!);
  }

  private grantClickedRow(): void {
    this.grantRows([this._clickedRow!]);
  }
}
