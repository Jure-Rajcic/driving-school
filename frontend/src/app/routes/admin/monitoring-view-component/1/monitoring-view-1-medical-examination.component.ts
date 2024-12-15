import { Component, inject } from '@angular/core';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { lucidePlus } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronDown } from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import {
  AppointmentChanges,
  AppointmentManagmentDataTableComponent,
} from 'src/app/components/admin/appointment-managment-data-table';
import { hlmH1 } from '@spartan-ng/ui-typography-helm';
import {
  AppointmentsResultsDTO,
  AppointmentConfirmationDTO,
  AppointmentDTO,
  MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT,
  MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS,
  MEDICAL_EXAMINATION_ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION,
  MEDICAL_EXAMINATION_ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION,
  MEDICAL_EXAMINATION_ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS,
  MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT,
  ClientDTO,
} from '@shared/dtos';
import { SocketClientService } from 'src/app/services/socket-client-service';
import { AdminMedicalExaminationService } from 'src/app/services/admin/1-medical-examination-service';
import { AppointmentConfirmationDataTableComponent } from 'src/app/components/admin/appointment-confirmation-data-table';
import { AppointmentManagementDialogSaveChangesComponent } from 'src/app/components/admin/appointment-management-dialog-save-changes';
import { AppointmentResultsDataTableComponent } from 'src/app/components/admin/appointment-results-data-table';

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [
    AppointmentManagmentDataTableComponent,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    BrnCommandImports,
    HlmCommandImports,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,

    AppointmentManagmentDataTableComponent,
    BrnCommandImports,
    HlmCommandImports,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    AppointmentConfirmationDataTableComponent,
    AppointmentResultsDataTableComponent,
  ],
  providers: [provideIcons({ lucidePlus, lucideCheck, lucideChevronDown })],
  templateUrl: './monitoring-view-1-medical-examination.component.html',
})
export class MonitoringViewMedicalExaminationComponent {
  hlmH1 = hlmH1;
  private readonly adminService = inject(AdminMedicalExaminationService);
  private readonly socketService = inject(SocketClientService);


  // **** (1) Appointment Management ****
  protected readonly appointments = this.adminService.appointments;

  onSaveChanges($event: AppointmentChanges) {
    const { createdAppointments, deletedAppointments } = $event;
    createdAppointments.forEach((appointment) => { this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_ADDED_APPOINTMENT, appointment)});
    deletedAppointments.forEach((appointment) => {this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_REMOVED_APPOINTMENT, appointment)});
  }


  // **** (2) Appointment Confirmation ****

  protected readonly appointmentConfirmationRequests = this.adminService.appointmentConfirmationRequests;
  protected readonly appointmentResults = this.adminService.appointmentResults;

  public onConfirmationAccepted(data: AppointmentConfirmationDTO[]) {
    data.forEach((e) => this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_CONFIRMED_ONE_OF_USER_REQUESTED_APPOINTMENTS, e));
  }

  public onConfirmationRejected(data: AppointmentConfirmationDTO[]) {
    data.forEach((e) => this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_REJECTED_ALL_OF_USER_REQUESTED_APPOINTMENTS, e));
  }

  // **** (3) Appointment Results ****

  protected onAccessGranted(data: ClientDTO[]) {
    data.forEach((e) => this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, e));
  }

  protected onAccessDenied(data: ClientDTO[]) {
    data.forEach((e) => this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION, e));
  }



  // simulateAdminGrantedAccesToPsychologicalExamination() {
  //   const data: AppointmentsResultsDTO = {
  //     client: { id: 1, name: 'John', surname: 'Doe' },
  //     granted: true,
  //   };
  //   this.socketService.sendSocketEvent(
  //     MEDICAL_EXAMINATION_ADMIN_GRANTED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION,
  //     data
  //   );
  // }

  // simulateAdminDeniedAccesToPsychologicalExamination() {
  //   const data: AppointmentsResultsDTO = {
  //     client: { id: 1, name: 'John', surname: 'Doe' },
  //     granted: true,
  //   };
  //   this.socketService.sendSocketEvent(
  //     MEDICAL_EXAMINATION_ADMIN_DENIED_ACCESS_TO_PSYCHOLOGICAL_EXAMINATION,
  //     data
  //   );
  // }
}
