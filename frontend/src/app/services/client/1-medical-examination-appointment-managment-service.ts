import { inject, Injectable, signal } from '@angular/core';
import { SocketClientService } from '../socket-client-service';
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

    public addAppointment(appointment: AppointmentDTO) {
        console.log('Adding appointment:', appointment);
        this.appointments.set([...this.appointments(), appointment]);
    }

    public deleteAppointment(appointment: AppointmentDTO) {
        console.log('Deleting appointment:', appointment);
        console.log('Appointments:', this.appointments());  
        this.appointments.set(this.appointments().filter(a => JSON.stringify(a) !== JSON.stringify(appointment)));
    }

    private handleAdminAddedAppointment(data: AppointmentDTO): void {
        this.addAppointment(data);
    }

    private handleAdminRemovedAppointment(data: AppointmentDTO): void {
        this.deleteAppointment(data);
    }



}