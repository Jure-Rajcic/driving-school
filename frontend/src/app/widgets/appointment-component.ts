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
import { MedicalExaminationWidgetType } from '../services/widget-service';


@Component({
  selector: 'appointment-component',
  standalone: true,
  imports: [
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
    HlmToasterComponent, 
    HlmButtonDirective
  ],
  providers: [provideIcons({ lucideChevronDown, lucideCopy, lucideArrowUpDown })],
  template: `
    <div class="flex flex-col justify-between gap-4 sm:flex-row">
      <input
        hlmInput
        class="w-full md:w-80"
        placeholder="Filter times..."
        [ngModel]="_timeFilter()"
        (ngModelChange)="_rawFilterInput.set($event)"
      />

      <button hlmBtn variant="outline" align="end" [brnMenuTriggerFor]="menu">
        Columns
        <hlm-icon name="lucideChevronDown" class="ml-2" size="sm" />
      </button>
      <ng-template #menu>
        <hlm-menu class="w-32">
          @for (column of _brnColumnManager.allColumns; track column.name) {
            <button
              hlmMenuItemCheckbox
              [disabled]="_brnColumnManager.isColumnDisabled(column.name)"
              [checked]="_brnColumnManager.isColumnVisible(column.name)"
              (triggered)="_brnColumnManager.toggleVisibility(column.name)"
            >
              <hlm-menu-item-check />
              <span>{{ column.label }}</span>
            </button>
          }
        </hlm-menu>
      </ng-template>
    </div>

    <brn-table
      hlm
      stickyHeader
      class="border-border mt-4 block h-[335px] overflow-auto rounded-md border"
      [dataSource]="_filteredSortedPaginatedData()"
      [displayedColumns]="_allDisplayedColumns()"
    >
      <brn-column-def name="select" class="w-12">
        <hlm-th *brnHeaderDef>
          <hlm-checkbox [checked]="_checkboxState()" (changed)="handleHeaderCheckboxChange()" />
        </hlm-th>
        <hlm-td *brnCellDef="let element">
          <hlm-checkbox [checked]="_isPaymentSelected(element)" (changed)="togglePayment(element)" />
        </hlm-td>
      </brn-column-def>

      <brn-column-def name="date" class="w-60 lg:flex-1">
        <hlm-th truncate *brnHeaderDef>Date</hlm-th>
        <hlm-td truncate *brnCellDef="let element">
          {{ element.date }}
        </hlm-td>
      </brn-column-def>

      <brn-column-def name="time" class="w-60 lg:flex-1">
        <hlm-th truncate *brnHeaderDef>Time</hlm-th>
        <hlm-td truncate *brnCellDef="let element">
          {{ element.time }}
        </hlm-td>
      </brn-column-def>

      <brn-column-def name="location" class="w-60 lg:flex-1">
        <hlm-th truncate *brnHeaderDef>Location</hlm-th>
        <hlm-td truncate *brnCellDef="let element">
          {{ element.location }}
        </hlm-td>
      </brn-column-def>

      
      <brn-column-def name="actions" class="w-16">
        <hlm-th *brnHeaderDef></hlm-th>
        <hlm-td *brnCellDef="let element">
        <hlm-toaster />
          <button hlmBtn variant="ghost" class="h-6 w-6 p-0.5" align="end" (click)="showToast(element)">
            <hlm-icon class="w-4 h-4" name="lucideCopy" />
          </button>
        </hlm-td>
      </brn-column-def>
      <div class="flex items-center justify-center p-20 text-muted-foreground" brnNoDataRow>No data</div>
    </brn-table>
    <div
      class="flex flex-col justify-between mt-4 sm:flex-row sm:items-center"
      *brnPaginator="let ctx; totalElements: _totalElements(); pageSize: _pageSize(); onStateChange: _onStateChange"
    >
      <span class="text-sm text-muted-foreground text-sm">{{ _selected().length }} of {{ _totalElements() }} row(s) selected</span>
      <div class="flex mt-2 sm:mt-0">
        <brn-select class="inline-block" placeholder="{{ _availablePageSizes[0] }}" [(ngModel)]="_pageSize">
          <hlm-select-trigger class="inline-flex mr-1 w-15 h-9">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content>
            @for (size of _availablePageSizes; track size) {
              <hlm-option [value]="size">
                {{ size === 10000 ? 'All' : size }}
              </hlm-option>
            }
          </hlm-select-content>
        </brn-select>

        <div class="flex space-x-1">
          <button size="sm" variant="outline" hlmBtn [disabled]="!ctx.decrementable()" (click)="ctx.decrement()">
            Previous
          </button>
          <button size="sm" variant="outline" hlmBtn [disabled]="!ctx.incrementable()" (click)="ctx.increment()">
            Next
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AppointmentComponent {
  @Input() set data(newData: MedicalExaminationWidgetType[]) {
    if (newData && Array.isArray(newData)) {
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

  private readonly _selectionModel = new SelectionModel<MedicalExaminationWidgetType>(true);
  protected readonly _isPaymentSelected = (payment: MedicalExaminationWidgetType) => this._selectionModel.isSelected(payment);
  protected readonly _selected = toSignal(this._selectionModel.changed.pipe(map((change) => change.source.selected)), {
    initialValue: [],
  });

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
    this._filteredSortedPaginatedData().every((payment) => this._selected().includes(payment)),
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

  protected togglePayment(payment: MedicalExaminationWidgetType) {
    this._selectionModel.toggle(payment);
  }

  protected handleHeaderCheckboxChange() {
    const previousCbState = this._checkboxState();
    if (previousCbState === 'indeterminate' || !previousCbState) {
      this._selectionModel.select(...this._filteredSortedPaginatedData());
    } else {
      this._selectionModel.deselect(...this._filteredSortedPaginatedData());
    }
  }

  showToast(element: MedicalExaminationWidgetType) {
    toast('Location Copied', {
      description: `Do you need directions?`,
      action: {
        label: 'Open in Google Maps',
        onClick: () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(element.location)}`, '_blank'),
      },
    });
  }

  getSelectedAppointments(): MedicalExaminationWidgetType[] {
    return this._selected();
  }
}