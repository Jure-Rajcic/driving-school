import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket-service';
import { AppointmentDTO, AppointmentConfirmationDTO, APPOINTMENT_CONFIRMATION_EVENT } from '@shared/dtos';
import { SocketEventHandler } from './socket-event-handler';

@Injectable({
    providedIn: 'root',
})
export class AppointmentConfirmationService extends SocketEventHandler<AppointmentConfirmationDTO> {

    constructor() { super(APPOINTMENT_CONFIRMATION_EVENT); }

    handleEvent(data: AppointmentConfirmationDTO): void {
        this.addAppointmentConfirmationReq(data);
    }

    appointmentConfirmationRequests = signal<AppointmentConfirmationDTO[]>([]);

    addAppointmentConfirmationReq(appointmentConfirmation: AppointmentConfirmationDTO): void {
        this.appointmentConfirmationRequests.set([...this.appointmentConfirmationRequests(), appointmentConfirmation]);
    }

}