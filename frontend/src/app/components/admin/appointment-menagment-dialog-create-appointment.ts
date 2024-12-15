import { Component, EventEmitter, Output } from '@angular/core';
import { AppointmentDTO } from '@shared/dtos';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { lucidePlus } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmIconComponent } from '../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component';
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
import { signal } from '@angular/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { FormsModule } from '@angular/forms';

type ClinicDto = { label: string; value: string };
enum PopoverStateEnum {
  Closed = 'closed',
  Open = 'open',
}

@Component({
  selector: 'appointment-menagment-dialog-create-appointment',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmIconComponent,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,

    HlmButtonDirective,
    BrnCommandImports,
    HlmCommandImports,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    HlmAlertDialogContentComponent,
    FormsModule,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogContentComponent,
    HlmButtonDirective,
    HlmIconComponent,
  ],
  providers: [provideIcons({ lucidePlus, lucideCheck, lucideChevronDown })],
  templateUrl: './appointment-menagment-dialog-create-appointment.html',
})
export class AppointmentMenagmentDialogCreateAppointmentComponent {
  public PopoverStateEnum = PopoverStateEnum;

  protected readonly appointmentDate: string | undefined;
  protected readonly appointmentTime: string | undefined;
  public readonly clinicPopoverOptions = [
    { label: 'Clinic 1', value: 'clinic-1' },
    { label: 'Clinic 2', value: 'clinic-2' },
  ];
  public readonly clinicPopoverState = signal<PopoverStateEnum>(
    PopoverStateEnum.Closed
  );
  protected readonly selectedClinic = signal<ClinicDto | undefined>(undefined);

  @Output()
  readonly onAppointmentCreated = new EventEmitter<AppointmentDTO>();

  protected stateChanged(state: 'open' | 'closed') {
    const popOverStates = {
      open: PopoverStateEnum.Open,
      closed: PopoverStateEnum.Closed,
    };
    this.clinicPopoverState.set(popOverStates[state]);
  }

  protected popoverOptionSelected(selectedPopoverOption: ClinicDto) {
    this.clinicPopoverState.set(PopoverStateEnum.Closed);
    if (this.selectedClinic()?.value === selectedPopoverOption.value)
      this.selectedClinic.set(undefined);
    else this.selectedClinic.set(selectedPopoverOption);
  }

  protected tryCreateAppointmentLoccaly(): boolean {
    if (
      !this.appointmentDate ||
      !this.appointmentTime ||
      !this.selectedClinic()
    ) {
      alert('Please fill all fields');
      return false;
    } else {
      this.createAppointmentLocally();
      return true;
    }
  }

  private createAppointmentLocally(): void {
    const data: AppointmentDTO = {
      id: 101,
      date: this.appointmentDate!,
      time: this.appointmentTime!,
      location: this.selectedClinic()!.value,
    };
    this.onAppointmentCreated.emit(data);
  }
}
