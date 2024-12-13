import { inject, Injectable, signal } from '@angular/core';
import { SocketClientService } from './socket-client-service';
import { ADMIN_ADDED_APPOINTMENT, ADMIN_REMOVED_APPOINTMENT, AppointmentDTO } from '@shared/dtos';

@Injectable({
    providedIn: 'root',
})
export class AppointmentManagementService {

    private readonly socketService = inject(SocketClientService);
    readonly appointments = signal<AppointmentDTO[]>([]);

    constructor() {
        this.socketService.bindEventCallback(ADMIN_ADDED_APPOINTMENT, this.handleAdminAddedAppointment.bind(this));
        this.socketService.bindEventCallback(ADMIN_REMOVED_APPOINTMENT, this.handleAdminRemovedAppointment.bind(this));
    }

    private addAppointment(appointment: AppointmentDTO) {
        console.log('Adding appointment:', appointment);
        this.appointments.set([...this.appointments(), appointment]);
    }

    private deleteAppointment(appointment: AppointmentDTO) {
        console.log('Deleting appointment:', appointment);
        this.appointments.set(this.appointments().filter(a => a.id !== appointment.id));
    }

    private handleAdminAddedAppointment(data: AppointmentDTO): void {
        this.addAppointment(data);
    }

    private handleAdminRemovedAppointment(data: AppointmentDTO): void {
        this.deleteAppointment(data);
    }



}