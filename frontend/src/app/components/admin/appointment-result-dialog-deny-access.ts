import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideCircleX } from '@ng-icons/lucide';
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
  DENY_SINGLE,
  DENY_ALL_SELECTED,
}

@Component({
  selector: 'appointment-result-dialog-deny-access',
  standalone: true,
  templateUrl: './appointment-result-dialog-deny-access.html',
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
export class AppointmentCResultDialogDenyAccessComponent {

  protected mode = signal<ResultMode | undefined>(undefined);
  protected title = signal<string | undefined>(undefined);
  protected denyRowAction: () => void = () => {};

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
        ? ResultMode.DENY_SINGLE
        : ResultMode.DENY_ALL_SELECTED;
      this.mode.set(initialMode);

      switch (initialMode) {
        case ResultMode.DENY_SINGLE:
          this.title.set('Deny clicked')
          this.denyRowAction = this.denyClickedRow.bind(this);
          break;
        case ResultMode.DENY_ALL_SELECTED:
          this.title.set('Deny all selected');
          this.denyRowAction = this.denyAllSelectedRows.bind(this);
          break;
        default:
          this.title.set(undefined);
          console.error('Invalid deny mode');
      }
  }

  @Output() private readonly accessDenied = new EventEmitter<ClientDTO[]>();

  protected tryDenyingRow(): boolean {
    if (!this._clickedRow || !this._selectedRows || this.mode() === undefined) {
      alert('Something went wrong, please close the dialog and try again');
      return false;
    } else {
      this.denyRowAction();
      return true;
    }
  }

  private denyRows(appointments: ClientDTO[]): void {
    this.accessDenied.emit(appointments);
  }

  private denyAllSelectedRows(): void {
    this.denyRows(this._selectedRows!);
  }

  private denyClickedRow(): void {
    this.denyRows([this._clickedRow!]);
  }
}
