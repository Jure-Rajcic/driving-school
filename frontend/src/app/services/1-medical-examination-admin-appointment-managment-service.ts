import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket-service';
import { AppointmentDTO, APPOINTMENT_MANAGEMENT_SERVICE} from '@shared/dtos';
import { SocketEventHandler } from './socket-event-handler';

@Injectable({
    providedIn: 'root',
})
export class AppointmentManagementService extends SocketEventHandler<AppointmentDTO> {

    constructor() { super(APPOINTMENT_MANAGEMENT_SERVICE); }

    appointments = signal<AppointmentDTO[]>([]);
    
    addAppointment(appointment: AppointmentDTO) {
        this.appointments.set([...this.appointments(), appointment]);
    }

    onRealTimeUpdate(data: AppointmentDTO): void {
        console.log('AppointmentDTO Result:', data);
        this.addAppointment(data);
    }

}