import { Component, inject, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { AsyncPipe, NgClass } from "@angular/common";
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
import { AppointmentManagementService } from "src/app/services/client/1-medical-examination-appointment-managment-service";
import { AcessToPsychologicalExaminationDTO, ADMIN_ADDED_APPOINTMENT, ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, ADMIN_REMOVED_APPOINTMENT, AppointmentConfirmationDTO, AppointmentDTO, MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, MEDICAL_EXAMINATION_ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, MEDICAL_EXAMINATION_ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, MEDICAL_EXAMINATION_ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT } from "@shared/dtos";
import { SocketClientService } from "src/app/services/socket-client-service";
import { AppointmentConfirmationService } from "src/app/services/admin/1-medical-examination-appointment-confirmation-service";
import { AppointmentConfirmationDataTableComponent } from "src/app/components/admin/appointment-confirmation-data-table";
import { FormsModule } from '@angular/forms';
import { AppSvgComponent } from "src/app/components/app-svg-component";
import { toObservable } from '@angular/core/rxjs-interop';
import { AppointmentManagementDialogSaveChangesComponent } from "src/app/components/admin/appointment-management-dialog-save-changes";

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
    HlmButtonDirective,
    BrnCommandImports,
    HlmCommandImports,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,

    HlmButtonDirective,
    AppointmentManagmentDataTableComponent,
    BrnCommandImports,
    HlmCommandImports,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    AppointmentConfirmationDataTableComponent,
    AppointmentManagementDialogSaveChangesComponent,
  ],
  providers: [provideIcons({ lucidePlus, lucideCheck, lucideChevronDown })],
  templateUrl: './monitoring-view-1-medical-examination.component.html',
})
export class MonitoringViewMedicalExaminationComponent {

  hlmH1 = hlmH1;
  private readonly appointmentManagmentService = inject(AppointmentManagementService);
  protected readonly appointments = this.appointmentManagmentService.appointments;

  protected locallyCreatedAppointments: AppointmentDTO[] = [];

  protected onAppointmentCreatedLocally(appointment: AppointmentDTO) {
    const newLocallyCreatedAppointments = [...this.locallyCreatedAppointments];
    newLocallyCreatedAppointments.push(appointment);
    this.updateLocallyAffectedAppointments(newLocallyCreatedAppointments, undefined);
  }

  protected locallyDeletedAppointments: AppointmentDTO[] = [];

  protected onAppointmentsDeletedLocally(appointments: AppointmentDTO[]) {
    const newLocallyDeletedAppointments = [...this.locallyDeletedAppointments];
    appointments.forEach(appointment => newLocallyDeletedAppointments.push(appointment));
    this.updateLocallyAffectedAppointments(undefined, newLocallyDeletedAppointments);
  }

  protected readonly IsSaveChangesEnabled = signal(false);
  private readonly appointments$ = toObservable(this.appointments);

  private _ = this.appointments$.subscribe(appointments => {
    const newLocallyCreatedAppointments = this.locallyCreatedAppointments.filter(appointment => !appointments.some(a => a.id === appointment.id));
    const newLocallyDeletedAppointments = this.locallyDeletedAppointments.filter(appointment => appointments.some(a => a.id === appointment.id));
    this.updateLocallyAffectedAppointments(newLocallyCreatedAppointments, newLocallyDeletedAppointments);
  })

  private updateLocallyAffectedAppointments(newLocallyCreatedAppointments: AppointmentDTO[] | undefined, newLocallyDeletedAppointments: AppointmentDTO[] | undefined) {
    if (!newLocallyCreatedAppointments && !newLocallyDeletedAppointments) return;
    if(newLocallyCreatedAppointments) this.locallyCreatedAppointments = newLocallyCreatedAppointments;
    if(newLocallyDeletedAppointments) this.locallyDeletedAppointments = newLocallyDeletedAppointments;

    const intersection = this.locallyCreatedAppointments.filter(appointment => this.locallyDeletedAppointments.some(a => a.id === appointment.id));
    intersection.forEach(appointment => {
      this.locallyCreatedAppointments = this.locallyCreatedAppointments.filter(a => a.id !== appointment.id);
      this.locallyDeletedAppointments = this.locallyDeletedAppointments.filter(a => a.id !== appointment.id);
    });

    const SaveChangesEnabled = this.locallyCreatedAppointments.length > 0 || this.locallyDeletedAppointments.length > 0;
    this.IsSaveChangesEnabled.set(SaveChangesEnabled);
  }


  protected onSaveChanges($event: any) {
    this.locallyCreatedAppointments.forEach(appointment => {
      this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, appointment);
    });
    this.locallyCreatedAppointments = [];
    this.locallyDeletedAppointments.forEach(appointment => {
      this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT, appointment);
    });
    this.locallyDeletedAppointments = [];
    this.IsSaveChangesEnabled.set(false);
  }









  /// TODO remove this
  private readonly socketService = inject(SocketClientService);

  readonly demo1: AppointmentDTO = { id: 1, 'date': '2021-01-01', 'time': '12:00', 'location': 'New York' };
  readonly demo2: AppointmentDTO = { id: 2, 'date': '2021-01-02', 'time': '12:20', 'location': 'New York2' };
  readonly demo3: AppointmentDTO = { id: 3, 'date': '2021-01-03', 'time': '12:40', 'location': 'New York3' };
  readonly demo4: AppointmentDTO = { id: 4, 'date': '2021-01-04', 'time': '13:00', 'location': 'New York4' };
  readonly demo5: AppointmentDTO = { id: 5, 'date': '2021-01-05', 'time': '13:20', 'location': 'New York5' };
  simulateAdminAddedAppointment() {
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo1);
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo2);
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo3);
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo4);
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, this.demo5);
  }

  simulateAdminDeletedAppointment() {
    const data: AppointmentDTO = this.demo1;
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT, data);
  }


  confirmationAppointmentService = inject(AppointmentConfirmationService);
  appointmentConfirmationRequests = this.confirmationAppointmentService.appointmentConfirmationRequests;

  simulateAdminConfirmedAppointment() {
    const data: AppointmentConfirmationDTO = {
      appointments: [{ id: 5, date: '2021-01-01', time: '14:00', location: 'Chicago' }],
      userId: 1
    }
    this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, data)
  }

  simulateAdminDeclinedAppointment() {
    const data: AppointmentConfirmationDTO = {
      appointments: [{ id: 5, date: '2021-01-01', time: '14:00', location: 'Chicago' }],
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