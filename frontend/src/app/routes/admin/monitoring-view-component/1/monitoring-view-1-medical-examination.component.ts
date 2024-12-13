import { Component, inject, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
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
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { lucidePlus } from "@ng-icons/lucide";
import { provideIcons } from "@ng-icons/core";
import { HlmIconComponent } from "../../../../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.component";
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
import { AppointmentManagmentDataTableComponent } from "src/app/components/admin/appointment-managment-data-table";
import { hlmH1 } from "@spartan-ng/ui-typography-helm";
import { AppointmentManagementService } from "src/app/services/1-medical-examination-admin-appointment-managment-service";
import { AcessToPsychologicalExaminationDTO, ADMIN_ADDED_APPOINTMENT, ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, ADMIN_REMOVED_APPOINTMENT, AppointmentConfirmationDTO, AppointmentDTO, MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, MEDICAL_EXAMINATION_ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, MEDICAL_EXAMINATION_ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, MEDICAL_EXAMINATION_ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT } from "@shared/dtos";
import { SocketClientService } from "src/app/services/socket-client-service";
import { AppointmentConfirmationService } from "src/app/services/1-medical-examination-admin-appointment-confirmation-service";
import { AppointmentConfirmationDataTableComponent } from "src/app/components/admin/appointment-confirmation-data-table";

type Clinic = { label: string; value: string }

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [
    AppointmentManagmentDataTableComponent, 
    HlmButtonDirective, 
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
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
    AppointmentManagmentDataTableComponent,
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
    AppointmentConfirmationDataTableComponent,
  ],
    providers: [provideIcons({ lucidePlus, lucideCheck, lucideChevronDown })],
    templateUrl: './monitoring-view-1-medical-examination.component.html',
})
export class MonitoringViewMedicalExaminationComponent {

  hlmH1 = hlmH1;
  appointmentManagmentService = inject(AppointmentManagementService);
  appointments = this.appointmentManagmentService.appointments;

  public clinics = [
    {
      label: 'Clinic 1',
      value: 'clinic-1'
    },
    {
      label: 'Clinic 2',
      value: 'clinic-2'
    },
    {
      label: 'Clinic 3',
      value: 'clinic-3'
    },
  ];

  public currentClinic = signal<Clinic | undefined>(undefined);
  public state = signal<'closed' | 'open'>('closed');

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(framework: Clinic) {
    this.state.set('closed');
    if (this.currentClinic()?.value === framework.value) {
      this.currentClinic.set(undefined);
    } else {
      this.currentClinic.set(framework);
    }
  }

  socketService = inject(SocketClientService);

  readonly demo1: AppointmentDTO = { id: 1, 'date': '2021-01-01', 'time': '12:00', 'location': 'New York'};
  readonly demo2: AppointmentDTO = { id: 2, 'date': '2021-01-02', 'time': '12:20', 'location': 'New York2'};
  simulateAdminAddedAppointment() {
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo1);
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo2);
  }

  simulateAdminDeletedAppointment() {
    const data: AppointmentDTO = this.demo1;
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT, data);
  }


  confirmationAppointmentService = inject(AppointmentConfirmationService);
  appointmentConfirmationRequests = this.confirmationAppointmentService.appointmentConfirmationRequests;

  simulateAdminConfirmedAppointment() {
    const data: AppointmentConfirmationDTO = {
      appointments: [ { id:5, date: '2021-01-01', time: '14:00', location: 'Chicago'} ],
      userId: 1
    }
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, data)
  }

  simulateAdminDeclinedAppointment() {
    const data: AppointmentConfirmationDTO = {
      appointments: [ { id:5, date: '2021-01-01', time: '14:00', location: 'Chicago'} ],
      userId: 1
    }
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, data)
  }


  simulateAdminGrantedAccesToPsychologicalExamination() {
    const data: AcessToPsychologicalExaminationDTO = {
      userId: 1,
      granted: true,
    }
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, data)
  }

  simulateAdminDeniedAccesToPsychologicalExamination() {
    const data: AcessToPsychologicalExaminationDTO = {
      userId: 1,
      granted: true,
    }
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, data)
  }

}