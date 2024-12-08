import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket-service';
import { AppointmentDTO, APPOINTMENT_MANAGEMENT_EVENT, ActionWrapper } from '@shared/dtos';
import { SocketEventHandler } from './socket-event-handler';

@Injectable({
    providedIn: 'root',
})
export class AppointmentManagementService extends SocketEventHandler<ActionWrapper<AppointmentDTO>> {

    constructor() { super(APPOINTMENT_MANAGEMENT_EVENT); }

    appointments = signal<AppointmentDTO[]>([]);
    
    addAppointment(appointment: AppointmentDTO) {
        console.log('Adding appointment:', appointment);
        this.appointments.set([...this.appointments(), appointment]);
    }

    deleteAppointment(appointment: AppointmentDTO) {
        console.log('Deleting appointment:', appointment);
        this.appointments.set(this.appointments().filter(a => a.id !== appointment.id));
    }

    handleEvent(data: ActionWrapper<AppointmentDTO>): void {
        const {action, payload: appointment} = data;
        console.log('Handling event:', action, appointment);
        switch(action) {
            case 'add':
                this.addAppointment(appointment);
                break;
            case 'delete':
                this.deleteAppointment(appointment);
                break;
            default:
                console.error('Unknown action:', action);
        }
    }

}