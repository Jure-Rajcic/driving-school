import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  lucideArrowUpDown,
  lucideBrainCircuit,
  lucideChevronDown,
  lucideCircleCheck,
  lucideCircleX,
  lucideListChecks,
  lucideTrash2,
  lucideGroup

} from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {
  HlmCheckboxCheckIconComponent,
  HlmCheckboxComponent,
} from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import {
  BrnTableModule,
  PaginatorState,
  useBrnColumnManager,
} from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { debounceTime, map } from 'rxjs';
import { toast } from 'ngx-sonner';
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
import { AppointmentConfirmationDTO, AppointmentDTO } from '@shared/dtos';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { AppointmentConfirmationDialogRejectConfirmationComponent } from './appointment-confirmation-dialog-reject-confirmation';
import { AppointmentConfirmationDialogAcceptConfirmationComponent } from "./appointment-confirmation-dialog-accept-confirmation";

// TODO provide more information about the user
export type Row = {
  appointment: AppointmentDTO;
  userId: number;
};

@Component({
  selector: 'appointment-confirmation-data-table',
  standalone: true,
  imports: [
    FormsModule,
    BrnMenuTriggerDirective,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmIconComponent,
    HlmCheckboxComponent,
    BrnSelectModule,
    HlmSelectModule,
    FormsModule,
    BrnMenuTriggerDirective,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    HlmIconComponent,
    HlmInputDirective,
    HlmCheckboxComponent,
    BrnSelectModule,
    HlmSelectModule,
    CommonModule,
    AppointmentConfirmationDialogRejectConfirmationComponent,
    AppointmentConfirmationDialogAcceptConfirmationComponent,
],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideTrash2,
      lucideArrowUpDown,
      lucideListChecks,
      lucideCircleCheck,
      lucideCircleX,
      lucideGroup
    }),
  ],
  templateUrl: './appointment-confirmation-data-table.html',
})
export class AppointmentConfirmationDataTableComponent {
  private readonly _data = signal<Row[]>([]);

  @Input() set data(newData: AppointmentConfirmationDTO[]) {
    if (!newData || !Array.isArray(newData)) return;

    // Flatten the data into Row objects that include appointment and userId
    const allRows: Row[] = newData.flatMap((reqDto) =>
      reqDto.appointments.map((appointment) => ({
        appointment,
        userId: reqDto.userId,
      }))
    );

    // Save selected requests before updating the data
    const selectedRequests = this._selected();

    // Sort the data by date, time, and location
    this.updateAppointmentsWithSorting(allRows);

    // Restore the selected requests
    while (this._selected().length > 0)
      this._selectionModel.deselect(this._selected()[0]);
    selectedRequests.forEach((selectedRequest) => {
      const row = this._data().find(
        (row) => JSON.stringify(row) === JSON.stringify(selectedRequest)
      );
      if (row) {
        this._selected().push(row);
        this.toggleRow(row);
      }
    });
  }

  private updateAppointmentsWithSorting(newData: Row[]) {
    const sortedRows = newData.sort((rowA, rowB) => {
      // Compare by date
      const dateComparison =
        new Date(rowA.appointment.date).getTime() -
        new Date(rowB.appointment.date).getTime();
      if (dateComparison !== 0) return dateComparison;

      // Compare by time if dates are equal
      const timeComparison = this._compareTimes(
        rowA.appointment.time,
        rowB.appointment.time
      );
      if (timeComparison !== 0) return timeComparison;

      // Compare by location if time is also equal
      return rowA.appointment.location.localeCompare(rowB.appointment.location);
    });

    this._data.set(newData);
  }

  // Helper function to compare time strings (e.g., "10:00 AM")
  private _compareTimes(time1: string, time2: string): number {
    const parseTime = (time: string) => {
      const [hours, minutes] = time.match(/\d+/g)!.map(Number);
      const isPM = time.toLowerCase().includes('pm');
      return (hours % 12) + (isPM ? 12 : 0) * 60 + minutes;
    };

    return parseTime(time1) - parseTime(time2);
  }

  protected readonly _rawFilterInput = signal('');
  protected readonly _appointmentFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<Row>(true);
  protected readonly _isRowSelected = (row: Row) =>
    this._selectionModel.isSelected(row);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    {
      initialValue: [],
    }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    appointment: { visible: true, label: 'Appointment' },
    user: { visible: true, label: 'User' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _filteredData = computed(() => {
    const appointmentFilter = this._appointmentFilter()?.trim()?.toLowerCase();
    if (appointmentFilter && appointmentFilter.length > 0) {
      return this._data().filter((u) =>
        (
          u.appointment.date +
          ' ' +
          u.appointment.time +
          ' ' +
          u.appointment.location
        )
          .toLowerCase()
          .includes(appointmentFilter)
      );
    }
    return this._data();
  });
  protected readonly _filteredSortedPaginatedData = computed(() => {
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const data = this._filteredData();
    return [...data];
  });
  protected readonly _allFilteredPaginatedDataSelected = computed(() =>
    this._filteredSortedPaginatedData().every((row) =>
      this._selected().includes(row)
    )
  );

  protected readonly _totalElements = computed(
    () => this._filteredData().length
  );
  protected readonly _onStateChange = ({
    startIndex,
    endIndex,
  }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => this._appointmentFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });
  }

  protected toggleRow(row: Row) {
    this._selectionModel.toggle(row);
    if (this._isRowSelected(row)) {
      this._retainSelectedUserRequest(row);
    } else {
      this._restoreUserRequests(row);
    }
  }

  private readonly hiddenUserRows: Map<number, Row[]> = new Map();

  private _retainSelectedUserRequest(selectedRequest: Row) {
    const allUserRequests = this._data().filter(
      (row) => row.userId === selectedRequest.userId
    );
    this.hiddenUserRows.set(
      selectedRequest.userId,
      allUserRequests.filter((row) => row !== selectedRequest)
    );
    const newData = this._data().filter(
      (row) =>
        this.hiddenUserRows.get(selectedRequest.userId)!.indexOf(row) === -1
    );
    this.updateAppointmentsWithSorting(newData);
  }

  private _restoreUserRequests(deselectedRequest: Row) {
    const newData = this._data().concat(
      this.hiddenUserRows.get(deselectedRequest.userId)!
    );
    this.hiddenUserRows.delete(deselectedRequest.userId);
    this.updateAppointmentsWithSorting(newData);
  }


  private extractDTOFromAppointmentRows(rows: Row[]): AppointmentConfirmationDTO[] {
    const data: AppointmentConfirmationDTO[] = [];
    rows.forEach((row) => {
      let existingUser = data.find((d) => d.userId === row.userId);
      if (!existingUser) {
        data.push({
          userId: row.userId,
          appointments: [],
        });
        existingUser = data[data.length - 1];
      } 
      existingUser.appointments.push(row.appointment);
    });
    return data;
  }

  @Output()
  readonly confirmationAccepted = new EventEmitter<AppointmentConfirmationDTO[]>();
  protected onConfirmationAccepted(rows: Row[]) {
    const data = this.extractDTOFromAppointmentRows(rows);
    this.confirmationAccepted.emit(data);
  }

  @Output()
  readonly confirmationRejected = new EventEmitter<AppointmentConfirmationDTO[]>();
  protected onConfirmationRejected(rows: Row[]) {
    const data = this.extractDTOFromAppointmentRows(rows);
    this.confirmationRejected.emit(data);
  }

}
