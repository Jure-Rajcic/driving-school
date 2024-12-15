import { Component, inject, signal, ViewChild } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { hlmH3, hlmUl } from '../../../../libs/ui/ui-typography-helm/src/index';
import { AppointmentDataTableComponent } from './appointment-data-table';
import {
  AppointmentConfirmationDTO,
  AppointmentDTO,
  MEDICAL_EXAMINATION_USER_REQUESTED_APPOINTMENTS,
} from '@shared/dtos';
import { SocketClientService } from 'src/app/services/socket-client-service';
import { AppointmentDialogRequestAppointmentsComponent } from './appointment-dialog-request-appointments';
import { UserMedicalExaminationService } from 'src/app/services/user/1-medical-examination-service';

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [AppointmentDataTableComponent],
  templateUrl: './carousel-page-content-1-medical-examination-component.html',
})
export class MedicalExaminationContentComponent {
  readonly hlmH3 = hlmH3;
  readonly hlmUl = hlmUl;

  readonly appointmentService = inject(UserMedicalExaminationService);
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

    //TODO open accordion after it scrolls to top
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
}
