import {  Component, inject, ViewChild } from "@angular/core";
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { AppointmentManagementService } from "../../services/1-medical-examination-admin-appointment-managment-service";
import {  hlmH3, hlmUl } from '../../../../libs/ui/ui-typography-helm/src/index';
import { AppointmentDataTableComponent } from "./appointment-data-table";
import { APPOINTMENT_CONFIRMATION_EVENT, AppointmentConfirmationDTO } from "@shared/dtos";
import { SocketService } from "src/app/services/socket-service";

@Component({
  selector: 'medical-examination-content',
  standalone: true,
  imports: [AppointmentDataTableComponent, HlmButtonDirective],
  templateUrl: './carousel-page-content-1-medical-examination-component.html',
})
export class MedicalExaminationContentComponent  {
  
  readonly appointmentService = inject(AppointmentManagementService);
  readonly appointments = this.appointmentService.appointments;

  hlmH3 = hlmH3;
  hlmUl = hlmUl;

  @ViewChild('appointmentComponent')
  appointmentComponent!: AppointmentDataTableComponent;

  requestAppointment() {
    // TODO open dialog and edit upper text
    if (!this.appointmentComponent) return;
    const selectedAppointments = this.appointmentComponent.getSelectedAppointments();
    console.log('Selected Appointments:', selectedAppointments);
  }

  readonly socketService = inject(SocketService);
  simulateClientSendAppointmentConfirmationReq() {

    const dummy2: AppointmentConfirmationDTO = {
      appointments: [
        { id:4, date: '2021-01-01', time: '12:00', location: 'New York'},
        { id:5, date: '2021-01-01', time: '14:00', location: 'Chicago'},
      ],
      userId: 1
    }
    this.socketService.sendSocketEvent(APPOINTMENT_CONFIRMATION_EVENT, dummy2)
  }

}