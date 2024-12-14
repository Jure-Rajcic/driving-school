import { Component, inject, signal, ViewChild } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AppointmentManagementService } from '../../services/client/1-medical-examination-appointment-managment-service';
import { hlmH3, hlmUl } from '../../../../libs/ui/ui-typography-helm/src/index';
import { AppointmentDataTableComponent } from './appointment-data-table';
import {
  AppointmentConfirmationDTO,
  AppointmentDTO,
  MEDICAL_EXAMINATION_USER_REQUESTED_APPOINTMENTS,
} from '@shared/dtos';
import { SocketClientService } from 'src/app/services/socket-client-service';
import { AppointmentDialogRequestAppointmentsComponent } from './appointment-dialog-request-appointments';

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [
    AppointmentDataTableComponent,
    AppointmentDialogRequestAppointmentsComponent,
  ],
  templateUrl: './carousel-page-content-1-medical-examination-component.html',
})
export class MedicalExaminationContentComponent {
  readonly hlmH3 = hlmH3;
  readonly hlmUl = hlmUl;

  readonly appointmentService = inject(AppointmentManagementService);
  readonly appointments = this.appointmentService.appointments;
  protected readonly selectedAppointments = signal<AppointmentDTO[]>([]);
  protected readonly onSelectedAppointments = (
    selectedAppointments: AppointmentDTO[]
  ) => this.selectedAppointments.set(selectedAppointments);

  readonly socketService = inject(SocketClientService);

  protected onAppointmentsRequested($event: AppointmentDTO[]) {
    // TODO change to get userID from service
    const data: AppointmentConfirmationDTO = {
      appointments: $event,
      userId: 1,
    };
    this.sendAppointmentConfirmationReq(data);

    this.scrollToTop();
  }

  private sendAppointmentConfirmationReq(data: AppointmentConfirmationDTO) {
    console.log('sending appointment confirmation request', data);
    this.socketService.sendSocketEvent(
      MEDICAL_EXAMINATION_USER_REQUESTED_APPOINTMENTS,
      data
    );
  }

  private scrollToTop() {
    setTimeout(() => {
      console.log('scrolling to top');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1000);
  }

  // simulateClientSendAppointmentConfirmationReq() {

  //   const dummy2: AppointmentConfirmationDTO = {
  //     appointments: [
  //       { id:4, date: '2021-01-01', time: '12:00', location: 'New York'},
  //       { id:5, date: '2021-01-01', time: '14:00', location: 'Chicago'},
  //     ],
  //     userId: 1
  //   }
  //   this.socketService.sendSocketEvent(MEDICAL_EXAMINATION_USER_REQUESTED_APPOINTMENTS, dummy2)
  // }
}
