import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  effect,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  lucideArrowUpDown,
  lucideBrainCircuit,
  lucideChevronDown,
  lucideListChecks,
  lucideRefreshCcw,
  lucideTrash2,
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
import { ClientDTO } from '@shared/dtos';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { AppointmentCResultDialogDenyAccessComponent } from './appointment-result-dialog-deny-access';
import { AppointmentCResultDialogGrantAccessComponent } from './appointment-result-dialog-grant-access';

// TODO provide more information about the user

@Component({
  selector: 'appointment-result-data-table',
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
    AppointmentCResultDialogGrantAccessComponent,
    AppointmentCResultDialogDenyAccessComponent,
    CommonModule,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideRefreshCcw,
      lucideArrowUpDown,
      lucideListChecks,
    }),
  ],
  templateUrl: './appointment-results-data-table.html',
})
export class AppointmentResultsDataTableComponent {
  private readonly _data = signal<ClientDTO[]>([]);

  @Input() set data(newData: ClientDTO[]) {
    if (!newData || !Array.isArray(newData)) return;

    // Save selected requests before updating the data
    const selectedRequests = this._selected();

    // Sort the data by date, time, and location
    this.updateClientsWithSorting(newData);

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

  private updateClientsWithSorting(newData: ClientDTO[]) {
    const sortedRows = newData.sort((c1, c2) => {
      // Compare by name
      const nameComparison = c1.name.localeCompare(c2.name);
      if (nameComparison !== 0) return nameComparison;

      // Compare by surname
      const surnameComparison = c1.surname.localeCompare(c2.surname);
      if (surnameComparison !== 0) return surnameComparison;

      const idComparison = c1.id - c2.id;
      return idComparison;
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
  protected readonly _clientFilter = signal('');
  private readonly _debouncedFilter = toSignal(
    toObservable(this._rawFilterInput).pipe(debounceTime(300))
  );

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<ClientDTO>(true);
  protected readonly _isRowSelected = (row: ClientDTO) =>
    this._selectionModel.isSelected(row);
  protected readonly _selected = toSignal(
    this._selectionModel.changed.pipe(map((change) => change.source.selected)),
    {
      initialValue: [],
    }
  );

  protected readonly _brnColumnManager = useBrnColumnManager({
    client: { visible: true, label: 'Client' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _filteredData = computed(() => {
    const clientFilter = this._clientFilter()?.trim()?.toLowerCase();
    if (clientFilter && clientFilter.length > 0) {
      return this._data().filter((u) =>
        (u.name + ' ' + u.surname).toLowerCase().includes(clientFilter)
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
    effect(() => this._clientFilter.set(this._debouncedFilter() ?? ''), {
      allowSignalWrites: true,
    });
  }

  protected toggleRow(row: ClientDTO) {
    this._selectionModel.toggle(row);
    if (this._isRowSelected(row)) {
      this._retainSelectedUserRequest(row);
    } else {
      this._restoreUserRequests(row);
    }
  }

  private readonly hiddenUserRequests: Map<number, ClientDTO[]> = new Map();

  private _retainSelectedUserRequest(selectedClient: ClientDTO) {
    const allUserRequests = this._data().filter(
      (client) => client.id === selectedClient.id
    );
    this.hiddenUserRequests.set(
      selectedClient.id,
      allUserRequests.filter((row) => row !== selectedClient)
    );
    const newData = this._data().filter(
      (row) =>
        this.hiddenUserRequests.get(selectedClient.id)!.indexOf(row) === -1
    );
    this.updateClientsWithSorting(newData);
  }

  private _restoreUserRequests(deselectedRequest: ClientDTO) {
    const newData = this._data().concat(
      this.hiddenUserRequests.get(deselectedRequest.id)!
    );
    this.hiddenUserRequests.delete(deselectedRequest.id);
    this.updateClientsWithSorting(newData);
  }

  @Output()
  protected readonly accessGranted = new EventEmitter<ClientDTO[]>();
  protected onAccessGranted($event: ClientDTO[]) {
  // TODO nakon resolvanja maknit i obavjestit admine da je maknuto
  this.accessGranted.emit($event);
  }

  @Output()
  protected readonly accessDenied = new EventEmitter<ClientDTO[]>();
  protected onAccessDenied($event: ClientDTO[]) {
  // TODO nakon resolvanja maknit i obavjestit admine da je maknuto
  this.accessDenied.emit($event);
  }
}
