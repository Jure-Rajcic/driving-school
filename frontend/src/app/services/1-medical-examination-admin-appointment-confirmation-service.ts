import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket-service';
import { AppointmentDTO, AppointmentConfirmationReqDto, AppointmentConfirmationResDto, APPOINTMENT_CONFIRMATION_EVENT_REQ} from '@shared/dtos';
import { SocketEventHandler } from './socket-event-handler';

@Injectable({
    providedIn: 'root',
})
export class AppointmentConfirmationService extends SocketEventHandler<AppointmentConfirmationReqDto> {

    constructor() { super(APPOINTMENT_CONFIRMATION_EVENT_REQ); }

    handleEvent(data: AppointmentConfirmationReqDto): void {
        this.addAppointmentConfirmationReq(data);
    }

    appointmentConfirmationRequests = signal<AppointmentConfirmationReqDto[]>([]);

    addAppointmentConfirmationReq(appointmentConfirmation: AppointmentConfirmationReqDto): void {
        this.appointmentConfirmationRequests.set([...this.appointmentConfirmationRequests(), appointmentConfirmation]);
    }

}