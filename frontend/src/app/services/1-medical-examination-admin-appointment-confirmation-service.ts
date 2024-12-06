import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket-service';
import { AppointmentDTO, APPOINTMENT_CONFIRMATION_SERVICE, AppointmentConfirmationReqDto, AppointmentConfirmationResDto} from '@shared/dtos';
import { SocketEventHandler } from './socket-event-handler';

@Injectable({
    providedIn: 'root',
})
export class AppointmentConfirmationService extends SocketEventHandler<AppointmentConfirmationReqDto> {

    constructor() { super(APPOINTMENT_CONFIRMATION_SERVICE); }

    onRealTimeUpdate(data: AppointmentConfirmationReqDto): void {
        console.log('AppointmentDTO Result:', data);
        this.addAppointment(data);
    }

    appointments = signal<AppointmentConfirmationReqDto[]>([]);
    addAppointment(appointmentConfirmation: AppointmentConfirmationReqDto): void {
        this.appointments.set([...this.appointments(), appointmentConfirmation]);
    }

}