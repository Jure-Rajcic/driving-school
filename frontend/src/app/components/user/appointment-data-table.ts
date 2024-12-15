import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { lucideArrowUpDown, lucideChevronDown, lucideCopy } from '@ng-icons/lucide';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import {  HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmIconComponent, provideIcons } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnTableModule, PaginatorState, useBrnColumnManager } from '@spartan-ng/ui-table-brain';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnSelectModule } from '@spartan-ng/ui-select-brain';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { debounceTime, map } from 'rxjs';
import { toast } from 'ngx-sonner';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AppointmentDTO } from '@shared/dtos';
import { AppointmentDialogRequestAppointmentsComponent } from './appointment-dialog-request-appointments';



@Component({
  selector: 'appointment-data-table',
  standalone: true,
  imports: [
    FormsModule,
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    HlmButtonModule,
    HlmIconComponent,
    HlmInputDirective,
    HlmCheckboxComponent,
    BrnSelectModule,
    HlmSelectModule,
    HlmToasterComponent, 
    HlmButtonDirective,
  ],
  providers: [provideIcons({ lucideChevronDown, lucideCopy, lucideArrowUpDown })],
  templateUrl: './appointment-data-table.html',
})

// TODO refactor this component to be generalizide for apointments
export class AppointmentDataTableComponent {

  @Input() set data(newData: AppointmentDTO[]) {
    if (!newData || !Array.isArray(newData)) return;

    // Save selected requests before updating the data
    const selectedAppointments = this._selected()

    // Sort the data by date, time, and location
    this.updateAppointmentsWithSorting(newData);

    // Restore the selected requests
    while (this._selected().length > 0) this._selectionModel.deselect(this._selected()[0]);
    selectedAppointments.forEach(selectedAppointment => {
      const appointment = this._data().find(appointment => JSON.stringify(appointment) === JSON.stringify(selectedAppointment));
      if (appointment) {
        this._selected().push(appointment);
        this.toggleAppointment(appointment);
      }
    });
    
  }
  
  private updateAppointmentsWithSorting(newData: AppointmentDTO[]) {
    // Merge new data with the existing data and sort
    const sortedData = newData.sort((a, b) => {
      // Compare by date
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison !== 0) return dateComparison;

      // If dates are equal, compare by time
      const timeComparison = this._compareTimes(a.time, b.time);
      if (timeComparison !== 0) return timeComparison;

      // If time is also equal, compare by location name
      return a.location.localeCompare(b.location);
    });

    // Update the signal with the sorted data
    this._data.set(sortedData);
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
  protected readonly _timeFilter = signal('');
  private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [5, 10, 20, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  private readonly _selectionModel = new SelectionModel<AppointmentDTO>(true);
  protected readonly _isAppointmentSelected = (row: AppointmentDTO) => this._selectionModel.isSelected(row);
  protected readonly _selected = toSignal(this._selectionModel.changed.pipe(map((change) => change.source.selected)), {
    initialValue: [],
  });


  private readonly $selected = toObservable(this._selected);
  @Input() set onSelectedAppointments(onSelectedAppointments: (appointment: AppointmentDTO[]) => void) {
    this.$selected.subscribe((selectedAppointments) => onSelectedAppointments(selectedAppointments));
  }

  protected readonly _brnColumnManager = useBrnColumnManager({
    date: { visible: true, label: 'Date' },
    time: { visible: true, label: 'Time' },
    location: { visible: true, label: 'Location' },
  });
  protected readonly _allDisplayedColumns = computed(() => [
    'select',
    ...this._brnColumnManager.displayedColumns(),
    'actions',
  ]);

  private readonly _data = signal(this.data ?? []);
  private readonly _filteredData = computed(() => {
    const timeFilter = this._timeFilter()?.trim()?.toLowerCase();
    if (timeFilter && timeFilter.length > 0) {
      return this._data().filter((u) => u.time.toLowerCase().includes(timeFilter));
    }
    return this._data();
  });
  private readonly _timeSort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedData = computed(() => {
    const sort = this._timeSort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const data = this._filteredData();
    if (!sort) {
      return data.slice(start, end);
    }
    return [...data]
      .sort((p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.time.localeCompare(p2.time))
      .slice(start, end);
  });
  protected readonly _allFilteredPaginatedDataSelected = computed(() =>
    this._filteredSortedPaginatedData().every((row) => this._selected().includes(row)),
  );
  protected readonly _checkboxState = computed(() => {
    const noneSelected = this._selected().length === 0;
    const allSelectedOrIndeterminate = this._allFilteredPaginatedDataSelected() ? true : 'indeterminate';
    return noneSelected ? false : allSelectedOrIndeterminate;
  });

  protected readonly _totalElements = computed(() => this._filteredData().length);
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    // needed to sync the debounced filter to the name filter, but being able to override the
    // filter when loading new users without debounce
    effect(() => this._timeFilter.set(this._debouncedFilter() ?? ''), { allowSignalWrites: true });
  }

  protected toggleAppointment(row: AppointmentDTO) {
    this._selectionModel.toggle(row);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedData());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedData());
    }
  }

  protected showToast(element: AppointmentDTO) {
    toast('Location Copied', {
      description: `Do you need directions?`,
      action: {
        label: 'Open in Google Maps',
        onClick: () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.location)}`, '_blank'),
      },
    });
  }

  protected onAppointmentsRequested($event: AppointmentDTO[]) {
    console.log('Appointments Requested:', $event);
  }



}